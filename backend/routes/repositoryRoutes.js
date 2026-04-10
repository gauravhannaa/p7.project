import express from 'express';
import { 
  getRepositories, 
  createRepository, 
  updateRepository, 
  deleteRepository 
} from '../controllers/repositoryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getRepositories);
router.post('/', protect, createRepository);
router.put('/:id', protect, updateRepository);
router.delete('/:id', protect, deleteRepository);

export default router;