import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle.jsx';
import { useApp } from '../context/AppContext.jsx';

const Navbar = () => {
  const { user, logout } = useApp();

  return (
    <motion.nav className="nav glass" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <Link to="/" className="brand">HonkeyType</Link>
      <div className="nav-links">
        <Link to="/test">Test</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        {user ? <Link to="/dashboard">Dashboard</Link> : <Link to="/auth">Login</Link>}
        {user && <button className="ghost-btn" onClick={logout}>Logout</button>}
        <ThemeToggle />
      </div>
    </motion.nav>
  );
};

export default Navbar;
