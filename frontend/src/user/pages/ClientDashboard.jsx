import { useState, useEffect } from "react";
import { Briefcase, DollarSign, Plus, Clock, Star, Settings, ChevronRight, Award, Zap } from "lucide-react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [amount, setAmount] = useState("");
  const [clientData, setClientData] = useState(null);
  const [clientJobs, setClientJobs] = useState([]);
  const [clientStats, setClientStats] = useState({
    completedProjects: 0,
    activeProjects: 0,
    totalSpent: 0,
    avgRating: 0,
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchClientData = async () => {
      try {
       
        const profileResponse = await axios.get('http://localhost:3000/api/client/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const jobsResponse = await axios.get('http://localhost:3000/api/jobs/jobs', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const statsResponse = await axios.get('http://localhost:3000/api/client/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setClientData(profileResponse.data);
        setClientJobs(jobsResponse.data.data);
        setClientStats(statsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchClientData();
  }, [token]);

  const handleAddFunds = async (e) => {
    e.preventDefault();
    try {
      await axios.patch('http://localhost:3000/api/client/balance', 
        { amount: parseFloat(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setClientData(prev => ({
        ...prev,
        balance: prev.balance + parseFloat(amount)
      }));
      
      setShowAddFunds(false);
      setAmount("");
    } catch (error) {
      console.error("Error adding funds:", error);
    }
  };

  if (!clientData) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-xl text-gray-400">Loading your dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
      <Navbar />
      <div className="min-h-screen text-white pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
        
          <div className="backdrop-blur-md bg-gray-800/40 rounded-xl p-6 mb-10 shadow-xl border border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-1">
                  <div className="bg-gray-800 rounded-full p-2">
                    <Briefcase size={32} className="text-blue-400" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-1">Welcome, {clientData.name}</h1>
                  <p className="text-gray-400">{clientData.company || 'Your Workspace'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 backdrop-blur-md bg-gray-800/60 p-4 rounded-lg border border-gray-700 shadow-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="text-blue-400" />
                  <span className="text-2xl font-semibold">
                    ${clientData.balance?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <button 
                  onClick={() => setShowAddFunds(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
                >
                  <Plus size={18} /> Add Funds
                </button>
              </div>
            </div>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-700 transition-all hover:shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Briefcase className="text-blue-400" />
                </div>
                <span className="text-gray-300 font-medium">Completed Projects</span>
              </div>
              <p className="text-3xl font-bold mt-2 text-blue-100">
                {clientStats.completedProjects}
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-700 transition-all hover:shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Zap className="text-green-400" />
                </div>
                <span className="text-gray-300 font-medium">Active Projects</span>
              </div>
              <p className="text-3xl font-bold mt-2 text-green-100">
                {clientStats.activeProjects}
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-700 transition-all hover:shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <DollarSign className="text-purple-400" />
                </div>
                <span className="text-gray-300 font-medium">Total Spent</span>
              </div>
              <p className="text-3xl font-bold mt-2 text-purple-100">
                ${clientStats.totalSpent.toLocaleString()}
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-700 transition-all hover:shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-yellow-500/20 p-2 rounded-lg">
                  <Star className="text-yellow-400" />
                </div>
                <span className="text-gray-300 font-medium">Average Rating</span>
              </div>
              <p className="text-3xl font-bold mt-2 text-yellow-100">
                {clientStats.avgRating}/5
              </p>
            </div>
          </div>

          
          <nav className="flex gap-4 mb-10 border-b border-gray-700/50 backdrop-blur-md rounded-t-lg bg-gray-800/30 p-1">
            {['projects', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-t-lg transition-all ${
                  activeTab === tab 
                    ? 'bg-gray-700/70 text-blue-400 shadow-lg' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  {tab === 'projects' ? <Briefcase size={18} /> : <Settings size={18} />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </div>
              </button>
            ))}
          </nav>


          {activeTab === "projects" && (
            <div className="grid gap-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your Projects</h2>
                <button className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
                  View All <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {clientJobs.map(job => (
                  <div key={job._id} className="bg-gradient-to-br from-gray-800/90 to-gray-700/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 transition-all">
                    <div className="flex justify-between items-start mb-5">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-500/10 p-3 rounded-lg mt-1">
                          <Award size={20} className="text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{job.title}</h3>
                          <p className="text-gray-400 text-sm mt-1">Project ID: #{job._id.slice(-6)}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        job.status === 'completed' ? 'bg-green-100/10 text-green-400' :
                        job.status === 'active' ? 'bg-blue-100/10 text-blue-400' :
                        'bg-yellow-100/10 text-yellow-400'
                      }`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-6 line-clamp-2">{job.description}</p>
                    
                    <div className="flex justify-between text-gray-400 bg-gray-800/50 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-blue-400" />
                        <span className="font-medium">${job.budget}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-purple-400" />
                        <span>
                          {new Date(job.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button className="mt-4 w-full bg-gray-700/60 hover:bg-gray-700/80 text-blue-400 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                      View Details <ChevronRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showAddFunds && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-xl w-full max-w-md border border-gray-600 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 text-blue-100">Add Funds to Your Account</h3>
                <form onSubmit={handleAddFunds}>
                  <div className="mb-6">
                    <label className="block mb-2 text-gray-300">Amount (USD)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <DollarSign size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-3 pl-10 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Enter amount"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowAddFunds(false)}
                      className="flex-1 px-4 py-3 bg-gray-700/50 hover:bg-gray-600 rounded-lg transition-all text-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all shadow-lg"
                    >
                      Add Funds
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ClientDashboard;