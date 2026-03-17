const fallback = [
  'Precision beats speed when your fingers remember rhythm.',
  'A focused mind turns simple keystrokes into remarkable flow.',
  'Practice in silence, perform with confidence under pressure.'
];

export const generateParagraph = async (difficulty = 'medium') => {
  if (!process.env.OPENAI_API_KEY) {
    return fallback[Math.floor(Math.random() * fallback.length)] + ` (${difficulty})`;
  }

  // Placeholder for provider integration.
  return `AI paragraph generation enabled for ${difficulty} mode.`;
};
