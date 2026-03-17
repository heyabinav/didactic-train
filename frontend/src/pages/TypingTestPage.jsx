import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TypingArena from '../components/TypingArena.jsx';
import { useApp } from '../context/AppContext.jsx';
import { startTestApi, submitResultApi } from '../services/api.js';

const TypingTestPage = () => {
  const navigate = useNavigate();
  const { testConfig, user, token, setLatestResult } = useApp();
  const [paragraph, setParagraph] = useState('Loading paragraph...');
  const [stats, setStats] = useState({ wpm: 0, cpm: 0, accuracy: 100, errors: 0, timeLeft: testConfig.duration, progress: 0 });

  const fetchParagraph = async () => {
    const data = await startTestApi(testConfig);
    setParagraph(data.text);
    setStats({ wpm: 0, cpm: 0, accuracy: 100, errors: 0, timeLeft: testConfig.duration, progress: 0 });
  };

  useEffect(() => {
    fetchParagraph();
  }, [testConfig.difficulty, testConfig.useAi, testConfig.duration]);

  const handleComplete = async (finalStats) => {
    const payload = {
      ...finalStats,
      paragraph,
      difficulty: testConfig.difficulty,
      mode: testConfig.mode,
      duration: testConfig.duration
    };
    setLatestResult(payload);

    if (user && token) {
      await submitResultApi(payload, token);
    }

    navigate('/results');
  };

  return (
    <main className="container">
      <motion.section className="card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <div className="stats-row">
          <div><strong>WPM:</strong> {stats.wpm}</div>
          <div><strong>CPM:</strong> {stats.cpm}</div>
          <div><strong>Accuracy:</strong> {stats.accuracy}%</div>
          <div><strong>Errors:</strong> {stats.errors}</div>
        </div>
        <div className="progress-wrap"><div className="progress" style={{ width: `${stats.progress}%` }} /></div>
        <TypingArena
          key={paragraph}
          text={paragraph}
          duration={testConfig.duration}
          onProgress={setStats}
          onComplete={handleComplete}
        />
        <button className="ghost-btn" onClick={fetchParagraph}>Restart Test</button>
      </motion.section>
    </main>
  );
};

export default TypingTestPage;
