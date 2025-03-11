import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Check, XCircle, Clock, AlertTriangle, Mail, Loader } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const NotificationDetail = () => {
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch Notification Details
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/notifications/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setNotification(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch notification');
        setLoading(false);
      }
    };

    if (token) {
      fetchNotification();
    }
  }, [id, token]);

  // Handle Approve/Reject
  const handleAction = async (action) => {
    try {
      await axios.patch(`http://localhost:3000/api/notifications/${id}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate("/notifications");
    } catch (error) {
      console.error("Failed to perform action", error);
      alert(error.response?.data?.message || "Action failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <Loader className="animate-spin h-12 w-12 text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Navbar />
        <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
          <div className="inline-block p-6 bg-red-900/20 rounded-full mb-6">
            <XCircle className="h-12 w-12 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-200 mb-2">
            Error Loading Notification
          </h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => navigate("/notifications")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium"
          >
            Back to Notifications
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-100">
              Notification Details
            </h1>
            <button
              onClick={() => navigate("/notifications")}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-700/30 rounded-lg">
                {notification.type === 'alert' ? (
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                ) : notification.type === 'reminder' ? (
                  <Clock className="w-8 h-8 text-yellow-400" />
                ) : (
                  <Mail className="w-8 h-8 text-blue-400" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-100 mb-2">
                  {notification.message}
                </h3>
                <div className="flex items-center text-sm text-gray-400">
                  <Clock className="w-4 h-4 mr-2" />
                  {new Date(notification.createdAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>

            {notification.status === 'pending' && (
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => handleAction('approve')}
                  className="flex-1 px-6 py-3 bg-green-600/80 hover:bg-green-600 text-white rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Approve
                </button>
                <button
                  onClick={() => handleAction('reject')}
                  className="flex-1 px-6 py-3 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Reject
                </button>
              </div>
            )}

            {notification.status === 'approved' && (
              <div className="mt-6 p-4 bg-green-900/20 rounded-lg flex items-center gap-3">
                <Check className="w-6 h-6 text-green-400" />
                <span className="text-green-400">This request has been approved</span>
              </div>
            )}

            {notification.status === 'rejected' && (
              <div className="mt-6 p-4 bg-red-900/20 rounded-lg flex items-center gap-3">
                <XCircle className="w-6 h-6 text-red-400" />
                <span className="text-red-400">This request has been rejected</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotificationDetail;