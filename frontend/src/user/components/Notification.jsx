import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Bell, 
  CheckCircle, 
  AlertCircle,
  Mail,
  AlertTriangle,
  Clock
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const token = localStorage.getItem("token");

  // Fetch Notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/notifications", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setNotifications(response.data.data || []);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch notifications');
        setLoading(false);
      }
    };

    if (token) {
      fetchNotifications();
    }
  }, [token]);

  // Mark Notification as Read
  const markAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNotifications(notifications.map(n => 
        n._id === id ? { ...n, status: 'read' } : n
      ));
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  // Filter Notifications
  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'unread') return notification.status !== 'read';
    if (activeFilter === 'read') return notification.status === 'read';
    return true;
  });

  // Get Notification Icon
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'alert':
        return <AlertTriangle className="w-6 h-6 text-red-400" />;
      case 'reminder':
        return <Clock className="w-6 h-6 text-yellow-400" />;
      default:
        return <Mail className="w-6 h-6 text-blue-400" />;
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Navbar />
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-8" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-gray-700 h-8 w-8" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-700 rounded w-3/4" />
                    <div className="h-3 bg-gray-700 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Navbar />
        <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
          <div className="inline-block p-6 bg-red-900/20 rounded-full mb-6">
            <AlertCircle className="h-12 w-12 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-200 mb-2">
            Unable to Load Notifications
          </h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium"
          >
            Try Again
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
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pt-16">
          <div>
            <h1 className="text-3xl font-bold text-gray-100">
              Notifications
            </h1>
            <p className="text-gray-400 mt-1">
              {notifications.length} total · {notifications.filter(n => n.status !== 'read').length} unread
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-sm p-1 flex border border-gray-700">
            {['all', 'unread', 'read'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  px-4 py-2 text-sm capitalize rounded-md transition-all
                  ${activeFilter === filter 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-gray-400 hover:bg-gray-700/50'
                  }
                `}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg">
            <Bell className="h-20 w-20 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl text-gray-400 font-medium">
              No {activeFilter} notifications
            </h3>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <div
                key={notification._id}
                className={`
                  group flex items-start p-4 rounded-xl transition-all
                  bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50
                  ${notification.status !== 'read' && 'border-l-4 border-indigo-500'}
                `}
              >
                {/* Icon */}
                <div className="mr-4 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className={`
                      text-gray-200 mb-1
                      ${notification.status !== 'read' ? 'font-medium' : 'text-gray-400'}
                    `}>
                      {notification.message}
                    </p>
                    {notification.status !== 'read' && (
                      <button 
                        onClick={() => markAsRead(notification._id)}
                        className="text-gray-400 hover:text-indigo-400 transition-colors ml-4"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  
                  {/* Metadata */}
                  <div className="flex items-center text-sm text-gray-400 mt-2">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(notification.createdAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    {notification.type && (
                      <span className="ml-3 px-2 py-1 rounded-full bg-indigo-900/20 text-indigo-400 text-xs font-medium">
                        {notification.type}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default NotificationPage;