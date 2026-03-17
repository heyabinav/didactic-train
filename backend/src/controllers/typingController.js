import { generateParagraph } from '../services/aiService.js';
import {
  leaderboardService,
  startTestService,
  submitResultService,
  userHistoryService
} from '../services/typingService.js';

export const startTest = async (req, res) => {
  const { difficulty = 'medium', useAi = false } = req.body;
  if (useAi) {
    const text = await generateParagraph(difficulty);
    return res.json({ text, difficulty, source: 'ai' });
  }

  const paragraph = await startTestService({ difficulty });
  res.json(paragraph);
};

export const submitResult = async (req, res) => {
  const payload = { ...req.body, user: req.user.id };
  const result = await submitResultService(payload);
  res.status(201).json(result);
};

export const getLeaderboard = async (req, res) => {
  const { range = 'all-time' } = req.query;
  const data = await leaderboardService(range);
  res.json(data);
};

export const getUserHistory = async (req, res) => {
  const { userId } = req.params;
  const data = await userHistoryService(userId);
  res.json(data);
};
