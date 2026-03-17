import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext.jsx';

const HomePage = () => {
  const navigate = useNavigate();
  const { testConfig, setTestConfig } = useApp();

  return (
    <motion.main className="container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="hero card">
        <h1>Type fast. Type clean. Type like a pro.</h1>
        <p>HonkeyType blends speed, focus, and stunning design into one addictive training platform.</p>
        <div className="grid">
          <label>
            Mode
            <select value={testConfig.mode} onChange={(e) => setTestConfig({ ...testConfig, mode: e.target.value })}>
              <option value="time">Time</option>
              <option value="words">Words</option>
            </select>
          </label>
          <label>
            Duration
            <select
              value={testConfig.duration}
              onChange={(e) => setTestConfig({ ...testConfig, duration: Number(e.target.value) })}
            >
              <option value={15}>15s</option>
              <option value={30}>30s</option>
              <option value={60}>60s</option>
              <option value={120}>120s</option>
            </select>
          </label>
          <label>
            Difficulty
            <select
              value={testConfig.difficulty}
              onChange={(e) => setTestConfig({ ...testConfig, difficulty: e.target.value })}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={testConfig.useAi}
              onChange={(e) => setTestConfig({ ...testConfig, useAi: e.target.checked })}
            />
            AI Paragraphs
          </label>
        </div>
        <button className="primary-btn" onClick={() => navigate('/test')}>Start Typing Test</button>
      </section>
    </motion.main>
  );
};

export default HomePage;
