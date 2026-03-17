import { useEffect, useState } from 'react';
import { leaderboardApi } from '../services/api.js';

const LeaderboardPage = () => {
  const [range, setRange] = useState('all-time');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    leaderboardApi(range).then(setRows).catch(() => setRows([]));
  }, [range]);

  return (
    <main className="container">
      <section className="card">
        <h2>Leaderboard</h2>
        <select value={range} onChange={(e) => setRange(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="all-time">All Time</option>
        </select>
        <table>
          <thead>
            <tr><th>#</th><th>User</th><th>Best WPM</th><th>Avg WPM</th><th>Accuracy</th></tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.username + idx}>
                <td>{idx + 1}</td>
                <td>{row.username}</td>
                <td>{row.bestWpm}</td>
                <td>{row.avgWpm}</td>
                <td>{row.avgAccuracy}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default LeaderboardPage;
