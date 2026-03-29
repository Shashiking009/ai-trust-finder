import express from 'express';
import { getMatches } from '../controllers/matchController.js';
import { protect } from './authRoutes.js';

const router = express.Router();

router.get('/', protect, getMatches);

export default router;
