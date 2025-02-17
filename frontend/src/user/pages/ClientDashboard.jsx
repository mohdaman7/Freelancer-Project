import { useState, useEffect } from "react";
import { Briefcase, DollarSign, Plus, Clock, Star } from "lucide-react";
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

  if (!clientData) return <div className="text-center py-8">Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome, {clientData.name}
              </h1>
              <p className="text-gray-400">{clientData.company}</p>
            </div>
            
            <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="text-blue-400" />
                <span className="text-xl font-semibold">
                  ${clientData.balance?.toFixed(2) || '0.00'}
                </span>
              </div>
              <button 
                onClick={() => setShowAddFunds(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
              >
                <Plus size={18} /> Add Funds
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Briefcase className="text-blue-400" />
                <span className="text-gray-400">Completed Projects</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {clientStats.completedProjects}
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Briefcase className="text-green-400" />
                <span className="text-gray-400">Active Projects</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {clientStats.activeProjects}
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="text-purple-400" />
                <span className="text-gray-400">Total Spent</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                ${clientStats.totalSpent.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" />
                <span className="text-gray-400">Avg Rating</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {clientStats.avgRating}/5
              </p>
            </div>
          </div>

          <nav className="flex gap-4 mb-8 border-b border-gray-700">
            {['projects', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 ${
                  activeTab === tab 
                    ? 'border-b-2 border-blue-500 text-blue-400' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>


          {activeTab === "projects" && (
            <div className="grid gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your Projects</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {clientJobs.map(job => (
                  <div key={job._id} className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {job.status}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4">{job.description}</p>
                    <div className="flex justify-between text-gray-400">
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} />
                        <span>${job.budget}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>
                          {new Date(job.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {showAddFunds && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Add Funds</h3>
                <form onSubmit={handleAddFunds}>
                  <div className="mb-4">
                    <label className="block mb-2">Amount</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full p-2 bg-gray-700 rounded"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowAddFunds(false)}
                      className="flex-1 px-4 py-2 bg-gray-700 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded"
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