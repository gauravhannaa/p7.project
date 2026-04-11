import express from 'express';
import { loginAdmin } from '../controllers/authController.js';
import { protect, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/verify', protect, verifyAdmin);

export default router;