import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Puan gereklidir'],
    min: [1, 'Puan en az 1 olmalıdır'],
    max: [5, 'Puan en fazla 5 olabilir']
  },
  comment: {
    type: String,
    trim: true,
    maxlength: [500, 'Yorum en fazla 500 karakter olabilir']
  }
}, {
  timestamps: true
});

// Prevent duplicate reviews for same listing
reviewSchema.index({ reviewerId: 1, listingId: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;

