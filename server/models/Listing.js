import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Başlık gereklidir'],
    trim: true,
    maxlength: [100, 'Başlık en fazla 100 karakter olabilir']
  },
  category: {
    type: String,
    required: [true, 'Kategori gereklidir'],
    enum: ['ders-verme', 'yazılım', 'tasarım', 'dil', 'müzik', 'spor', 'diğer'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Açıklama gereklidir'],
    trim: true,
    maxlength: [1000, 'Açıklama en fazla 1000 karakter olabilir']
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Lokasyon en fazla 100 karakter olabilir']
  },
  price: {
    type: Number,
    min: [0, 'Fiyat negatif olamaz'],
    default: null
  },
  duration: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Index for search functionality
listingSchema.index({ title: 'text', description: 'text' });
listingSchema.index({ category: 1, status: 1 });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;

