import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password, university, department } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'İsim, email ve şifre gereklidir' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Bu email adresi zaten kullanılıyor' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      university,
      department
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        university: user.university,
        department: user.department,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Kullanıcı oluşturulamadı' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email ve şifre gereklidir' });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Geçersiz email veya şifre' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Geçersiz email veya şifre' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      university: user.university,
      department: user.department,
      profileImage: user.profileImage,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

