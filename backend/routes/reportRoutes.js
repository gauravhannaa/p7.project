import express from 'express';
import { getReports, createReport, updateReport, deleteReport } from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getReports);
router.post('/', protect, createReport);
router.put('/:id', protect, updateReport);
router.delete('/:id', protect, deleteReport);

export default router;