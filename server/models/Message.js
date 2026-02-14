import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: [true, 'Mesaj içeriği gereklidir'],
    trim: true,
    maxlength: [1000, 'Mesaj en fazla 1000 karakter olabilir']
  },
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for efficient querying
messageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });

const Message = mongoose.model('Message', messageSchema);

export default Message;

