import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import TypingTestPage from './pages/TypingTestPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import LeaderboardPage from './pages/LeaderboardPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import Navbar from './components/Navbar.jsx';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/test" element={<TypingTestPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  </>
);

export default App;
