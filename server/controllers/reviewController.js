import Review from '../models/Review.js';
import User from '../models/User.js';

// @desc    Get reviews for a user
// @route   GET /api/reviews/user/:userId
// @access  Public
export const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewedUserId: req.params.userId })
      .populate('reviewerId', 'name profileImage')
      .populate('listingId', 'title')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res) => {
  try {
    const { reviewedUserId, listingId, rating, comment } = req.body;

    if (!reviewedUserId || !listingId || !rating) {
      return res.status(400).json({ message: 'Alıcı, ilan ve puan gereklidir' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Puan 1-5 arasında olmalıdır' });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({
      reviewerId: req.user._id,
      listingId
    });

    if (existingReview) {
      return res.status(400).json({ message: 'Bu ilan için zaten değerlendirme yaptınız' });
    }

    const review = await Review.create({
      reviewerId: req.user._id,
      reviewedUserId,
      listingId,
      rating,
      comment: comment || ''
    });

    // Update user's average rating
    const reviewedUser = await User.findById(reviewedUserId);
    if (reviewedUser) {
      await reviewedUser.calculateAverageRating();
    }

    const populatedReview = await Review.findById(review._id)
      .populate('reviewerId', 'name profileImage')
      .populate('listingId', 'title');

    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

