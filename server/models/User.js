import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'İsim gereklidir'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email gereklidir'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Geçerli bir email adresi giriniz']
  },
  password: {
    type: String,
    required: [true, 'Şifre gereklidir'],
    minlength: [6, 'Şifre en az 6 karakter olmalıdır'],
    select: false
  },
  university: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    maxlength: [500, 'Biyografi en fazla 500 karakter olabilir'],
    trim: true
  },
  skills: {
    type: [String],
    default: []
  },
  profileImage: {
    type: String,
    default: ''
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  contactPreferences: {
    type: String,
    enum: ['email', 'message', 'both'],
    default: 'both'
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to calculate average rating
userSchema.methods.calculateAverageRating = async function() {
  const Review = mongoose.model('Review');
  const stats = await Review.aggregate([
    { $match: { reviewedUserId: this._id } },
    { $group: { _id: null, averageRating: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);
  
  if (stats.length > 0) {
    this.averageRating = Math.round(stats[0].averageRating * 10) / 10;
  } else {
    this.averageRating = 0;
  }
  await this.save();
};

const User = mongoose.model('User', userSchema);

export default User;

