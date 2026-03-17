import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const tokenFor = (user) =>
  jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || 'fallback-secret', {
    expiresIn: '7d'
  });

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashed });
  res.status(201).json({ user: { id: user._id, username: user.username, email: user.email }, token: tokenFor(user) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ user: { id: user._id, username: user.username, email: user.email }, token: tokenFor(user) });
};
