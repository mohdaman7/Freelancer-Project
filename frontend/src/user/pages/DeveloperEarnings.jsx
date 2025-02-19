import { useEffect, useState } from "react";
import axios from "axios";
import { Wallet, History, TrendingUp, Download } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DeveloperEarnings = () => {
  const [earnings, setEarnings] = useState({
    total: 0,
    available: 0,
    pending: 0
  });
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: "Earnings",
      data: [],
      borderColor: "#60a5fa",
      backgroundColor: "rgba(96, 165, 250, 0.2)",
      tension: 0.4,
    }]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/developers/earnings', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setEarnings(response.data.data.earnings);
        setTransactions(response.data.data.transactions);

        const chartLabels = response.data.data.chartData.map(item => item.month);
        const chartValues = response.data.data.chartData.map(item => item.amount);
        
        setChartData({
          labels: chartLabels,
          datasets: [{
            ...chartData.datasets[0],
            data: chartValues
          }]
        });

      } catch (error) {
        console.error("Error fetching earnings data:", error);
      } finally {
        setLoading(false);
      }
    };

    fn();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 pt-30 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          Loading earnings data...
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gray-900 text-gray-100 pt-30 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
  
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-400/10 rounded-lg">
                  <Wallet className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Total Earnings</h2>
                  <p className="text-3xl font-bold">${earnings.total.toFixed(2)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/20 p-4 rounded-xl">
                  <p className="text-sm text-gray-400">Available Balance</p>
                  <p className="text-xl font-semibold">${earnings.available.toFixed(2)}</p>
                </div>
                <div className="bg-gray-700/20 p-4 rounded-xl">
                  <p className="text-sm text-gray-400">Pending Clearance</p>
                  <p className="text-xl font-semibold">${earnings.pending.toFixed(2)}</p>
                </div>
              </div>
              <button 
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Withdraw Earnings
              </button>
            </div>

            
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Earnings Overview</h2>
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true },
                  },
                  scales: {
                    x: {
                      grid: { color: "#374151" },
                      ticks: { color: "#9CA3AF" },
                    },
                    y: {
                      grid: { color: "#374151" },
                      ticks: { color: "#9CA3AF" },
                    },
                  },
                }}
              />
            </div>
          </div>

         
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Transaction History</h2>
              <History className="w-6 h-6 text-blue-400" />
            </div>
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-700/20 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className={`text-sm ${
                      transaction.status === 'Completed' ? 'text-green-400' :
                      transaction.status === 'Pending' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default DeveloperEarnings;