import { useState, useEffect } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Bell, FileText } from "lucide-react";
import axios from "axios";

const userActivityData = [
  { day: "Mon", users: 900 },
  { day: "Tue", users: 900 },
  { day: "Wed", users: 900 },
  { day: "Thu", users: 950 },
  { day: "Fri", users: 1300 },
  { day: "Sat", users: 1300 },
  { day: "Sun", users: 1300 }
];

const revenueData = [
  { day: "Mon", amount: 120 },
  { day: "Tue", amount: 190 },
  { day: "Wed", amount: 150 },
  { day: "Thu", amount: 80 },
  { day: "Fri", amount: 70 },
  { day: "Sat", amount: 110 },
  { day: "Sun", amount: 120 }
];

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeJobs: 0,
    monthlyRevenue: 0,
    pendingIssues: 0
  });

  const [timeRange, setTimeRange] = useState("7");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/admin/reports");
        setMetrics({
          totalUsers: data.metrics.totalDevelopers + data.metrics.totalClients,
          activeJobs: data.metrics.totalJobs,
          monthlyRevenue: 84245,
          pendingIssues: 23
        });
      } catch (error) {
        console.error("Error fetching metrics", error);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="p-6 bg-gray min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-lg"
          />
          <Bell className="w-6 h-6 text-gray-600" />
          <img
            src="/api/placeholder/32/32"
            alt="Admin"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-full">
              <FileText className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <h3 className="text-2xl font-bold">{metrics.totalUsers.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-full">
              <FileText className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Jobs</p>
              <h3 className="text-2xl font-bold">{metrics.activeJobs.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-full">
              <FileText className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <h3 className="text-2xl font-bold">${metrics.monthlyRevenue.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-full">
              <FileText className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Issues</p>
              <h3 className="text-2xl font-bold">{metrics.pendingIssues}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold">User Activity</h3>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border rounded-lg px-3 py-1"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userActivityData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Area type="monotone" dataKey="users" fill="#818cf8" stroke="#818cf8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold">Revenue Overview</h3>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border rounded-lg px-3 py-1"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Bar dataKey="amount" fill="#818cf8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold">Recent Activities</h3>
            <button className="text-blue-600 text-sm">View All</button>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src="/api/placeholder/40/40" alt="User" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-medium">Sarah Johnson registered as a new developer</p>
                <p className="text-sm text-gray-600">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img src="/api/placeholder/40/40" alt="User" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-medium">Michael Chen posted a new job</p>
                <p className="text-sm text-gray-600">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img src="/api/placeholder/40/40" alt="User" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-medium">Emma Wilson completed a project</p>
                <p className="text-sm text-gray-600">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full bg-black text-white px-4 py-2 rounded-lg">
              Add New Admin
            </button>
            <button className="w-full bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-lg">
              Send Announcement
            </button>
            <button className="w-full bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-lg">
              Generate Report
            </button>
            <button className="w-full bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-lg">
              System Status Check
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;