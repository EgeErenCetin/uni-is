import express from 'express';
import { getUserById, updateUser, updateAvatar } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

router.get('/:id', getUserById);
router.put('/:id', protect, updateUser);
router.put('/:id/avatar', protect, upload.single('avatar'), updateAvatar);

export default router;

