import mongoose from 'mongoose';

const typingResultSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paragraph: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    mode: { type: String, enum: ['time', 'words'], default: 'time' },
    duration: { type: Number, default: 60 },
    wpm: { type: Number, required: true },
    cpm: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    errors: { type: Number, default: 0 },
    rawInput: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('TypingResult', typingResultSchema);
