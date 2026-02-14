import Listing from '../models/Listing.js';

// @desc    Get all listings with filters
// @route   GET /api/listings
// @access  Public
export const getListings = async (req, res) => {
  try {
    const { category, search, location, status = 'active' } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (search) {
      query.$text = { $search: search };
    }

    const listings = await Listing.find(query)
      .populate('userId', 'name email university department profileImage averageRating')
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get listing by ID
// @route   GET /api/listings/:id
// @access  Public
export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('userId', 'name email university department profileImage averageRating bio skills');

    if (!listing) {
      return res.status(404).json({ message: 'İlan bulunamadı' });
    }

    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new listing
// @route   POST /api/listings
// @access  Private
export const createListing = async (req, res) => {
  try {
    const { title, category, description, price, duration, location } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({ message: 'Başlık, kategori ve açıklama gereklidir' });
    }

    const listing = await Listing.create({
      userId: req.user._id,
      title,
      category,
      description,
      location: location || '',
      price: price || null,
      duration
    });

    const populatedListing = await Listing.findById(listing._id)
      .populate('userId', 'name email university department profileImage averageRating');

    res.status(201).json(populatedListing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update listing
// @route   PUT /api/listings/:id
// @access  Private
export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'İlan bulunamadı' });
    }

    // Check if user owns the listing
    if (listing.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    const { title, category, description, price, duration, status } = req.body;

    if (title) listing.title = title;
    if (category) listing.category = category;
    if (description) listing.description = description;
    if (req.body.location !== undefined) listing.location = req.body.location;
    if (price !== undefined) listing.price = price;
    if (duration !== undefined) listing.duration = duration;
    if (status) listing.status = status;

    const updatedListing = await listing.save();
    const populatedListing = await Listing.findById(updatedListing._id)
      .populate('userId', 'name email university department profileImage averageRating');

    res.json(populatedListing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete listing
// @route   DELETE /api/listings/:id
// @access  Private
export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'İlan bulunamadı' });
    }

    // Check if user owns the listing
    if (listing.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    await listing.deleteOne();
    res.json({ message: 'İlan silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

