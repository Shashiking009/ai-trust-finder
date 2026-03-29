import express from 'express';
import { updateProfile, addSkill, getAllUsers } from '../controllers/userController.js';
import { protect } from './authRoutes.js';

const router = express.Router();

router.put('/profile', protect, updateProfile);
router.post('/skills', protect, addSkill);
router.get('/', protect, getAllUsers);

export default router;
