"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Star, Github, Linkedin, Mail, MapPin, Briefcase, ChevronRight, FileText } from "lucide-react"
import { Line } from "react-chartjs-2"
import { useParams } from "react-router-dom"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const DeveloperProfile = () => {
  const [developer, setDeveloper] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("about")
  const { developerId } = useParams()

  useEffect(() => {
    const fetchDeveloperProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`http://localhost:3000/api/developers/profile/${developerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setDeveloper(response.data.data)
      } catch (err) {
        setError("Failed to fetch developer profile")
        console.error("Error fetching developer profile:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDeveloperProfile()
  }, [developerId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-xl text-gray-300">{error}</p>
        </div>
      </div>
    )
  }

  if (!developer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">No Data Found</h2>
          <p className="text-xl text-gray-300">Developer profile not available.</p>
        </div>
      </div>
    )
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-8 mb-8 shadow-xl backdrop-blur-sm  mt-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.y5h5x8qWW4LgZy3DrMe43QHaHb&pid=Api&P=0&h=180"
              alt="Profile"
              className="w-48 h-48 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                {developer.firstName} {developer.lastName}
              </h1>
              <p className="text-xl text-gray-300 mb-4">{developer.title}</p>
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-lg font-semibold">{developer.rating || "N/A"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-5 h-5 text-green-400" />
                  <span>{developer.location || "Remote"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-5 h-5 text-purple-400" />
                  <span>{developer.jobsCompleted || 0} jobs completed</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Contact
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-300 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> View Resume
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-colors duration-300 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Hire Me
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Skills Card */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Skills
              </h2>
              <div className="space-y-4">
                {developer?.skills?.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-gray-400">{skill.experience}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Connect
              </h2>
              <div className="space-y-4">
                <a
                  href={developer.githubUrl || "#"}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    developer.githubUrl
                      ? "bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white"
                      : "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Github className="w-6 h-6" />
                  GitHub
                </a>
                <a
                  href={developer.linkedinUrl || "#"}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    developer.linkedinUrl
                      ? "bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white"
                      : "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Linkedin className="w-6 h-6" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Middle and Right Columns */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
              <div className="flex mb-6">
                <button
                  onClick={() => setActiveTab("about")}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === "about"
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => setActiveTab("portfolio")}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === "portfolio"
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  Portfolio
                </button>
                <button
                  onClick={() => setActiveTab("earnings")}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === "earnings"
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  Earnings
                </button>
              </div>
              {activeTab === "about" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    About Me
                  </h2>
                  <p className="text-gray-300 leading-relaxed">{developer.bio || "No bio available."}</p>
                </div>
              )}
              {activeTab === "portfolio" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    Portfolio
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {developer.portfolio?.map((project, index) => (
                      <div key={index} className="bg-gray-700/50 rounded-xl p-4 hover:bg-gray-600/50 transition-all">
                        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                        <p className="text-gray-400 mb-4">{project.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                          >
                            View <ChevronRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "earnings" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
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
                          grid: { color: "rgba(255, 255, 255, 0.1)" },
                          ticks: { color: "#9CA3AF" },
                        },
                        y: {
                          grid: { color: "rgba(255, 255, 255, 0.1)" },
                          ticks: { color: "#9CA3AF" },
                        },
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DeveloperProfile

