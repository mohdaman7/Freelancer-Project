
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/admin/reports");
        setMetrics(data.metrics);
      } catch (error) {
        console.error("Error fetching metrics", error);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="metrics">
        <div>Total Developers: {metrics?.totalDevelopers}</div>
        <div>Total Clients: {metrics?.totalClients}</div>
        <div>Total Jobs: {metrics?.totalJobs}</div>
        <div>Total Transactions: {metrics?.totalTransactions}</div>
      </div>
    </div>
  );
};

export default Dashboard;
