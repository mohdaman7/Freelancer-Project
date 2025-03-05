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

 
  const theme = {
    primary: '#6366f1', 
    secondary: '#4f46e5', 
    accent: '#f59e0b',    
    background: '#f5f7ff', 
    cardBackground: '#ffffff', 
    text: '#1e293b',      
    mutedText: '#64748b'   
  };

 
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

 
  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'unread') return notification.status !== 'read';
    if (activeFilter === 'read') return notification.status === 'read';
    return true;
  });

  
  const getNotificationIcon = (type) => {
    const iconStyle = `w-6 h-6 ${notifications.status !== 'read' ? 'text-${theme.primary}' : 'text-gray-400'}`;
    
    switch(type) {
      case 'alert':
        return <AlertTriangle className={iconStyle} />;
      case 'reminder':
        return <Clock className={iconStyle} />;
      default:
        return <Mail className={iconStyle} />;
    }
  };

 
  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
        <Navbar />
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 rounded-lg bg-white shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-gray-200 h-8 w-8" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
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


  if (error) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
        <Navbar />
        <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
          <div className="inline-block p-6 bg-red-100 rounded-full mb-6">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Unable to Load Notifications
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all font-medium"
          >
            Try Again
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-2xl">
       
        <div className="flex justify-between items-center mb-8 pt-16">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: theme.text }}>
              Notifications
            </h1>
            <p className="text-gray-500 mt-1">
              {notifications.length} total · {notifications.filter(n => n.status !== 'read').length} unread
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-1 flex border border-gray-200">
            {['all', 'unread', 'read'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  px-4 py-2 text-sm capitalize rounded-md transition-all
                  ${activeFilter === filter 
                    ? 'bg-indigo-500 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>


        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <Bell className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl text-gray-500 font-medium">
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
                  bg-white shadow-sm hover:shadow-md
                  ${notification.status !== 'read' && 'border-l-4 border-indigo-500'}
                `}
              >

                <div className="mr-4 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className={`
                      text-gray-800 mb-1
                      ${notification.status !== 'read' ? 'font-medium' : 'text-gray-600'}
                    `}>
                      {notification.message}
                    </p>
                    {notification.status !== 'read' && (
                      <button 
                        onClick={() => markAsRead(notification._id)}
                        className="text-gray-400 hover:text-indigo-500 transition-colors ml-4"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  
              
                  <div className="flex items-center text-sm text-gray-500 mt-2">
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
                      <span className="ml-3 px-2 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs font-medium">
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