import Message from '../models/Message.js';

export const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join user's personal room
    socket.on('join', (userId) => {
      socket.join(`user_${userId}`);
      console.log(`User ${userId} joined their room`);
    });

    // Handle sending messages
    socket.on('sendMessage', async (data) => {
      try {
        const { senderId, receiverId, content } = data;

        // Save message to database
        const message = await Message.create({
          senderId,
          receiverId,
          content
        });

        const populatedMessage = await Message.findById(message._id)
          .populate('senderId', 'name profileImage')
          .populate('receiverId', 'name profileImage');

        // Emit to receiver
        io.to(`user_${receiverId}`).emit('newMessage', populatedMessage);
        
        // Emit back to sender for confirmation
        socket.emit('messageSent', populatedMessage);
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    // Handle typing indicator
    socket.on('typing', (data) => {
      socket.to(`user_${data.receiverId}`).emit('typing', {
        senderId: data.senderId,
        isTyping: data.isTyping
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

