import { useApp } from '../context/AppContext.jsx';

const ThemeToggle = () => {
  const { theme, setTheme } = useApp();

  return (
    <button className="ghost-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};

export default ThemeToggle;
