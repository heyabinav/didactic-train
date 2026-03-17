import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from '../config/db.js';
import Paragraph from '../models/Paragraph.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const datasetPath = path.resolve(__dirname, '../../data/paragraphs.json');

const run = async () => {
  await connectDB();
  const raw = fs.readFileSync(datasetPath, 'utf-8');
  const paragraphs = JSON.parse(raw);

  await Paragraph.deleteMany({});
  await Paragraph.insertMany(paragraphs);
  console.log(`Seeded ${paragraphs.length} paragraphs.`);
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
