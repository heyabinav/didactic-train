import mongoose from 'mongoose';

const paragraphSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, unique: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Paragraph', paragraphSchema);
