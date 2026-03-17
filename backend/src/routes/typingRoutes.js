import express from 'express';
import {
  getLeaderboard,
  getUserHistory,
  startTest,
  submitResult
} from '../controllers/typingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/start-test', startTest);
router.post('/submit-result', protect, submitResult);
router.get('/leaderboard', getLeaderboard);
router.get('/user-history/:userId', getUserHistory);

export default router;
