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
  const transactions = [
    {
      date: "2024-03-15",
      description: "Website Development",
      amount: 1200,
      status: "Completed",
    },
    {
      date: "2024-03-12",
      description: "Mobile App Project",
      amount: 850,
      status: "Pending",
    },
    {
      date: "2024-03-10",
      description: "API Integration",
      amount: 450,
      status: "Completed",
    },
  ];

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Earnings",
        data: [650, 890, 1200, 1050, 980, 1350],
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96, 165, 250, 0.2)",
        tension: 0.4,
      },
    ],
  };

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
                  <p className="text-3xl font-bold">$3,450.00</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/20 p-4 rounded-xl">
                  <p className="text-sm text-gray-400">Available Balance</p>
                  <p className="text-xl font-semibold">$1,200.00</p>
                </div>
                <div className="bg-gray-700/20 p-4 rounded-xl">
                  <p className="text-sm text-gray-400">Pending Clearance</p>
                  <p className="text-xl font-semibold">$850.00</p>
                </div>
              </div>
              <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2">
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
                    <p className="text-sm text-gray-400">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${transaction.amount}</p>
                    <p
                      className={`text-sm ${
                        transaction.status === "Completed"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >
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
