import { useEffect, useState } from "react";
import axios from "axios";
import { Star, Github, Linkedin } from "lucide-react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
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

const DeveloperProfile = () => {
  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { developerId } = useParams();

  useEffect(() => {
    const fetchDeveloperProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/developers/profile/${developerId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDeveloper(response.data.data);
      } catch (err) {
        setError("Failed to fetch developer profile");
        console.error("Error fetching developer profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeveloperProfile();
  }, [developerId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 pt-30 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          Loading profile...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 pt-30 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-red-400">
          {error}
        </div>
      </div>
    );
  }

  if (!developer) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 pt-30 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          No developer data found.
        </div>
      </div>
    );
  }

  const chartData = {
    labels: developer.earningsHistory?.map((item) => item.month) || [],
    datasets: [
      {
        label: "Earnings",
        data: developer.earningsHistory?.map((item) => item.amount) || [],
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96, 165, 250, 0.2)",
        tension: 0.4,
      },
    ],
  };
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-gray-100 pt-30 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={
                  developer?.profilePhoto || "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-400"
              />
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold">
                  {developer.firstName} {developer.lastName}
                </h1>
                <p className="text-gray-400">{developer.title}</p>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">
                    {developer.rating || "No rating yet"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="col-span-1">
              {/* Skills Card */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Skills</h2>
                <div className="space-y-2">
                  {developer?.skills?.map((skill, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-gray-400">{skill.experience}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Social Links</h2>
                <div className="space-y-2">
                  <a
                    href={developer.githubUrl || "#"}
                    className={`flex items-center gap-2 ${
                      !developer.githubUrl
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-gray-300 hover:text-blue-400"
                    }`}
                  >
                    <Github className="w-5 h-5" />
                    GitHub
                  </a>
                  <a
                    href={developer.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400"
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Middle Column */}
            <div className="col-span-2">
              {/* Bio Card */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">About Me</h2>
                <p className="text-gray-300">
                  {developer.bio || "No bio available."}
                </p>
              </div>

              {/* Earnings Overview */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  Earnings Overview
                </h2>
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DeveloperProfile;
