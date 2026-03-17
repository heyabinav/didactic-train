import { useEffect, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useApp } from '../context/AppContext.jsx';
import { userHistoryApi } from '../services/api.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DashboardPage = () => {
  const { user } = useApp();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!user) return;
    userHistoryApi(user.id).then(setHistory).catch(() => setHistory([]));
  }, [user]);

  const chartData = useMemo(() => {
    const latest = history.slice(0, 10).reverse();
    return {
      labels: latest.map((_, i) => `T${i + 1}`),
      datasets: [
        {
          label: 'WPM',
          data: latest.map((r) => r.wpm),
          backgroundColor: 'rgba(82, 169, 255, 0.6)'
        }
      ]
    };
  }, [history]);

  if (!user) return <main className="container"><section className="card">Please login to view dashboard.</section></main>;

  return (
    <main className="container">
      <section className="card">
        <h2>{user.username}'s Dashboard</h2>
        <p>Total Tests: {history.length}</p>
        <Bar data={chartData} />
      </section>
    </main>
  );
};

export default DashboardPage;
