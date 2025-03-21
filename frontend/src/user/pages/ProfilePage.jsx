import { useEffect, useState } from "react";
import axios from "axios";
import {
  Star,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Briefcase,
  ChevronRight,
  FileText,
  X,
  Settings,
  Plus,
  Trash2,
  UploadCloud,
  Save,
} from "lucide-react";
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
import { toast } from "sonner";

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
  const [activeTab, setActiveTab] = useState("about");
  const { developerId } = useParams();

  // Settings Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [activeSettingsTab, setActiveSettingsTab] = useState("profile");
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch Developer Profile
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
        setEditData(response.data.data);
      } catch (err) {
        setError("Failed to fetch developer profile");
        console.error("Error fetching developer profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeveloperProfile();
  }, [developerId]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:3000/api/developers/profile`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDeveloper(response.data.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

 
  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:3000/api/developers/resume`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setDeveloper({ ...developer, resumeUrl: response.data.data.resumeUrl });
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading resume:", error);
    }
  };


  const chartData = {
    labels: developer?.earningsHistory?.map((item) => item.month) || [],
    datasets: [
      {
        label: "Earnings",
        data: developer?.earningsHistory?.map((item) => item.amount) || [],
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96, 165, 250, 0.2)",
        tension: 0.4,
      },
    ],
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!developer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">No Data Found</h2>
          <p className="text-xl text-gray-300">
            Developer profile not available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-8 mb-8 shadow-xl backdrop-blur-sm mt-16 relative">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 hover:bg-gray-700/50 rounded-full transition-colors"
            >
              <Settings className="w-6 h-6 text-blue-400" />
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src="https://img.freepik.com/premium-photo/portrait-successful-programmer-game-developer-coder-guy-uses-computer-laptop-work-game-design-hacker-boy-generative-ai-cyber-gamer_117038-7605.jpg?w=740"
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
                  <span className="text-lg font-semibold">
                    {developer.rating || "N/A"}
                  </span>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Skills
              </h2>
              <div className="space-y-4">
                {developer.skills?.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-gray-400">{skill.experience}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
                  <p className="text-gray-300 leading-relaxed">
                    {developer.bio || "No bio available."}
                  </p>
                </div>
              )}
              {activeTab === "portfolio" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    Portfolio
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {developer.portfolio?.map((project, index) => (
                      <div
                        key={index}
                        className="bg-gray-700/50 rounded-xl p-4 hover:bg-gray-600/50 transition-all"
                      >
                        <h3 className="text-lg font-semibold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 mb-4">
                          {project.description}
                        </p>
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

      {/* Settings Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800/90 border border-gray-700 rounded-2xl w-full max-w-2xl backdrop-blur-lg">
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Edit Profile
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex">
              {/* Settings Navigation */}
              <div className="w-48 border-r border-gray-700 p-4 space-y-2">
                {["profile", "skills", "social", "resume"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSettingsTab(tab)}
                    className={`w-full text-left px-4 py-2 rounded-lg capitalize ${
                      activeSettingsTab === tab
                        ? "bg-blue-600/20 text-blue-400"
                        : "text-gray-400 hover:bg-gray-700/50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

             
              <div className="flex-1 p-6">
                {activeSettingsTab === "profile" && (
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm text-gray-300 mb-2">
                          First Name
                        </label>
                        <input
                          value={editData?.firstName || ""}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              firstName: e.target.value,
                            })
                          }
                          className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm text-gray-300 mb-2">
                          Last Name
                        </label>
                        <input
                          value={editData?.lastName || ""}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              lastName: e.target.value,
                            })
                          }
                          className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={editData?.bio || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, bio: e.target.value })
                        }
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white h-32"
                      />
                    </div>
                  </div>
                )}

                {activeSettingsTab === "skills" && (
                  <div className="space-y-4">
                    {editData?.skills?.map((skill, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <input
                          value={skill.name}
                          onChange={(e) => {
                            const newSkills = [...editData.skills];
                            newSkills[index].name = e.target.value;
                            setEditData({ ...editData, skills: newSkills });
                          }}
                          className="flex-1 bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white"
                          placeholder="Skill Name"
                        />
                        <select
                          value={skill.experience}
                          onChange={(e) => {
                            const newSkills = [...editData.skills];
                            newSkills[index].experience = e.target.value;
                            setEditData({ ...editData, skills: newSkills });
                          }}
                          className="w-32 bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Expert">Expert</option>
                        </select>
                        <button
                          onClick={() => {
                            const newSkills = editData.skills.filter(
                              (_, i) => i !== index
                            );
                            setEditData({ ...editData, skills: newSkills });
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        setEditData({
                          ...editData,
                          skills: [
                            ...editData.skills,
                            { name: "", experience: "Beginner" },
                          ],
                        })
                      }
                      className="w-full flex items-center justify-center gap-2 py-2 bg-gray-900/50 border border-dashed border-gray-600 rounded-lg hover:bg-gray-900"
                    >
                      <Plus className="w-4 h-4" /> Add Skill
                    </button>
                  </div>
                )}

                {activeSettingsTab === "social" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">
                        GitHub URL
                      </label>
                      <input
                        value={editData?.githubUrl || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            githubUrl: e.target.value,
                          })
                        }
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">
                        LinkedIn URL
                      </label>
                      <input
                        value={editData?.linkedinUrl || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            linkedinUrl: e.target.value,
                          })
                        }
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      />
                    </div>
                  </div>
                )}

                {activeSettingsTab === "resume" && (
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center">
                      <UploadCloud className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <input
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        className="hidden"
                        id="resumeUpload"
                        accept=".pdf,.doc,.docx"
                      />
                      <label
                        htmlFor="resumeUpload"
                        className="cursor-pointer inline-block px-6 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30"
                      >
                        Choose File
                      </label>
                      {selectedFile && (
                        <p className="mt-4 text-gray-400">
                          {selectedFile.name}
                        </p>
                      )}
                    </div>
                    {developer.resumeUrl && (
                      <div className="bg-gray-900/50 p-4 rounded-lg">
                        <p className="text-gray-400">Current Resume:</p>
                        <a
                          href={developer.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          View Resume
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-8 flex justify-end gap-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperProfile;
