import Paragraph from '../models/Paragraph.js';
import TypingResult from '../models/TypingResult.js';

export const startTestService = async ({ difficulty = 'medium' }) => {
  const pool = await Paragraph.find({ difficulty }).lean();
  if (!pool.length) {
    throw new Error('No paragraphs found for selected difficulty');
  }
  const selected = pool[Math.floor(Math.random() * pool.length)];
  return selected;
};

export const submitResultService = async (payload) => {
  const result = await TypingResult.create(payload);
  return result;
};

export const leaderboardService = async (range = 'all-time') => {
  const now = new Date();
  let since = null;

  if (range === 'daily') {
    since = new Date(now.setHours(0, 0, 0, 0));
  } else if (range === 'weekly') {
    const day = now.getDay();
    const diffToMonday = (day + 6) % 7;
    since = new Date(now);
    since.setDate(now.getDate() - diffToMonday);
    since.setHours(0, 0, 0, 0);
  }

  const match = since ? { createdAt: { $gte: since } } : {};

  return TypingResult.aggregate([
    { $match: match },
    {
      $group: {
        _id: '$user',
        avgWpm: { $avg: '$wpm' },
        bestWpm: { $max: '$wpm' },
        avgAccuracy: { $avg: '$accuracy' },
        tests: { $sum: 1 }
      }
    },
    { $sort: { bestWpm: -1, avgAccuracy: -1 } },
    { $limit: 20 },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' },
    {
      $project: {
        username: '$user.username',
        avgWpm: { $round: ['$avgWpm', 1] },
        bestWpm: 1,
        avgAccuracy: { $round: ['$avgAccuracy', 1] },
        tests: 1
      }
    }
  ]);
};

export const userHistoryService = async (userId) => {
  return TypingResult.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();
};
