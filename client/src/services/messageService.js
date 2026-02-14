import api from './api';

export const messageService = {
  getConversations: async () => {
    const response = await api.get('/messages/conversations');
    return response.data;
  },

  getMessages: async (userId) => {
    const response = await api.get(`/messages/${userId}`);
    return response.data;
  },

  sendMessage: async (receiverId, content) => {
    const response = await api.post('/messages', { receiverId, content });
    return response.data;
  },
};

