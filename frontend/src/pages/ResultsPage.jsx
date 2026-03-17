import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useApp } from '../context/AppContext.jsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const ResultsPage = () => {
  const { latestResult } = useApp();

  if (!latestResult) {
    return <main className="container"><section className="card">No result yet. Run a test first.</section></main>;
  }

  const chartData = {
    labels: ['WPM', 'Accuracy', 'CPM'],
    datasets: [
      {
        label: 'Performance Snapshot',
        data: [latestResult.wpm, latestResult.accuracy, latestResult.cpm],
        borderColor: '#72f2a4',
        backgroundColor: 'rgba(114, 242, 164, 0.2)'
      }
    ]
  };

  return (
    <main className="container">
      <section className="card">
        <h2>Results</h2>
        <p><strong>Final WPM:</strong> {latestResult.wpm}</p>
        <p><strong>Accuracy:</strong> {latestResult.accuracy}%</p>
        <p><strong>Error Count:</strong> {latestResult.errors}</p>
        <Line data={chartData} />
      </section>
    </main>
  );
};

export default ResultsPage;
