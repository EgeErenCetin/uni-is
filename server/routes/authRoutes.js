import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Çok fazla deneme yapıldı, lütfen daha sonra tekrar deneyin'
});

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.get('/me', protect, getMe);

export default router;

