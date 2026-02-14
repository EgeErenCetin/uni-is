import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import { messageService } from '../services/messageService';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Messages = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedUserId = searchParams.get('userId');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  const { data: conversations, isLoading: conversationsLoading } = useQuery({
    queryKey: ['conversations'],
    queryFn: messageService.getConversations,
    enabled: !!user,
  });

  const { data: initialMessages, isLoading: messagesLoading } = useQuery({
    queryKey: ['messages', selectedUserId],
    queryFn: () => messageService.getMessages(selectedUserId),
    enabled: !!selectedUserId,
  });

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    if (user?._id) {
      socketRef.current = io(API_URL, {
        auth: {
          token: localStorage.getItem('token'),
        },
      });

      socketRef.current.emit('join', user._id);

      socketRef.current.on('newMessage', (message) => {
        setMessages((prev) => [...prev, message]);
      });

      socketRef.current.on('typing', (data) => {
        setIsTyping(data.isTyping);
      });

      return () => {
        socketRef.current?.disconnect();
      };
    }
  }, [user]);

  useEffect(() => {
    if (selectedUserId && conversations) {
      const conversation = conversations.find(
        (conv) => conv.user._id === selectedUserId
      );
      setSelectedConversation(conversation);
    }
  }, [selectedUserId, conversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const queryClient = useQueryClient();
  const sendMessageMutation = useMutation({
    mutationFn: (content) => messageService.sendMessage(selectedUserId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      setNewMessage('');
    },
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUserId) return;

    socketRef.current?.emit('sendMessage', {
      senderId: user._id,
      receiverId: selectedUserId,
      content: newMessage.trim(),
    });

    sendMessageMutation.mutate(newMessage.trim());
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (selectedUserId) {
      socketRef.current?.emit('typing', {
        senderId: user._id,
        receiverId: selectedUserId,
        isTyping: true,
      });
    }
  };

  if (conversationsLoading) {
    return <LoadingSpinner />;
  }


  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-theme(spacing.32))] min-h-[600px]">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex h-full border border-gray-200 dark:border-gray-700">
        {/* Sidebar / Conversation List */}
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t('messages.title')}</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations && conversations.length > 0 ? (
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {conversations.map((conv) => (
                  <button
                    key={conv.user._id}
                    onClick={() => {
                      setSearchParams({ userId: conv.user._id });
                      setSelectedConversation(conv);
                    }}
                    className={`w-full p-4 text-left transition-all duration-200 hover:bg-white dark:hover:bg-gray-800/80 ${selectedUserId === conv.user._id
                      ? 'bg-white dark:bg-gray-800 border-l-4 border-primary-500 shadow-sm'
                      : 'border-l-4 border-transparent'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {conv.user.profileImage ? (
                          <img
                            src={`${API_URL}${conv.user.profileImage}`}
                            alt={conv.user.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-700"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-primary-700 dark:text-white font-bold shadow-inner">
                            {conv.user.name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        {/* Status Indicator (Mockup for now) */}
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <p className={`font-semibold truncate ${selectedUserId === conv.user._id ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'}`}>
                            {conv.user.name}
                          </p>
                          {conv.lastMessage.createdAt && (
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                              {new Date(conv.lastMessage.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate pr-2">
                            {conv.lastMessage.content}
                          </p>
                          {conv.unreadCount > 0 && (
                            <span className="bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-sm flex-shrink-0">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">{t('messages.noMessages')}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{t('messages.startConversation')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
          {selectedUserId ? (
            <>
              {/* Chat Header */}
              {selectedConversation && (
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm z-10">
                  <div className="flex items-center gap-4">
                    {selectedConversation.user.profileImage ? (
                      <img
                        src={`${API_URL}${selectedConversation.user.profileImage}`}
                        alt={selectedConversation.user.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-primary-700 dark:text-white font-bold text-sm">
                        {selectedConversation.user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-none mb-1">
                        {selectedConversation.user.name}
                      </h3>
                      <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        {t('messages.online')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Messages List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
                {messagesLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <LoadingSpinner />
                  </div>
                ) : messages.length > 0 ? (
                  messages.map((message, index) => {
                    const isOwn = message.senderId._id === user._id;
                    const isLastFromUser = index === messages.length - 1 || messages[index + 1]?.senderId._id !== message.senderId._id;

                    return (
                      <div
                        key={message._id}
                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'} group`}
                      >
                        <div
                          className={`max-w-[75%] lg:max-w-md px-5 py-3 shadow-sm relative ${isOwn
                            ? 'bg-primary-600 text-white rounded-2xl rounded-tr-none'
                            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-600'
                            } ${!isLastFromUser ? (isOwn ? 'rounded-tr-2xl mb-1' : 'rounded-tl-2xl mb-1') : ''}`}
                        >
                          <p className="leading-relaxed text-[15px]">{message.content}</p>
                          <p
                            className={`text-[10px] mt-1 text-right font-medium opacity-80 ${isOwn ? 'text-primary-100' : 'text-gray-400 dark:text-gray-300'
                              }`}
                          >
                            {new Date(message.createdAt).toLocaleTimeString('tr-TR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                            {isOwn && (
                              <span className="ml-1 inline-block">✓✓</span>
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-20 h-20 bg-primary-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-gray-900 dark:text-white font-medium text-lg">{t('messages.startChat.title')}</p>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xs mt-2">
                      {t('messages.startChat.desc')}
                    </p>
                  </div>
                )}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 px-4 py-2 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={handleTyping}
                      placeholder={t('messages.typeMessage')}
                      className="w-full py-3.5 pl-6 pr-12 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="p-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg shadow-primary-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                  >
                    <svg className="w-6 h-6 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/30 dark:bg-gray-900/20">
              <div className="w-24 h-24 bg-primary-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-12 h-12 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t('messages.selectConversation.title')}</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
                {t('messages.selectConversation.desc')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;

