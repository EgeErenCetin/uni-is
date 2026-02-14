import User from '../models/User.js';
import path from 'path';
import fs from 'fs';

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = async (req, res) => {
  try {
    const { name, university, department, bio, skills, contactPreferences } = req.body;
    
    // Check if user is updating their own profile
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    // Update fields
    if (name) user.name = name;
    if (university !== undefined) user.university = university;
    if (department !== undefined) user.department = department;
    if (bio !== undefined) user.bio = bio;
    if (skills !== undefined) user.skills = Array.isArray(skills) ? skills : [];
    if (contactPreferences) user.contactPreferences = contactPreferences;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user avatar
// @route   PUT /api/users/:id/avatar
// @access  Private
export const updateAvatar = async (req, res) => {
  try {
    // Check if user is updating their own profile
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Dosya yüklenmedi' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    // Delete old profile image if exists
    if (user.profileImage) {
      const oldImagePath = path.join(process.env.UPLOAD_PATH || './uploads', path.basename(user.profileImage));
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Update profile image path
    user.profileImage = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({ profileImage: user.profileImage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

