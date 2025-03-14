import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Bell, 
  CheckCircle, 
  Mail,
  AlertTriangle,
  Clock,
  Info
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  
  console.log(error);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/notifications", {
          headers: { 
            Authorization: `Bearer ${token}`,
            'X-User-Role': role
          }
        });

        setNotifications(response.data.data || []);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch notifications');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token, role]);

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

  const markAllAsRead = async () => {
    try {
      await axios.patch(`http://localhost:3000/api/notifications/mark-all-read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setNotifications(notifications.map(n => ({ ...n, status: 'read' })));
    } catch (error) {
      console.error("Failed to mark all notifications as read", error);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'unread') return notification.status !== 'read';
    if (activeFilter === 'read') return notification.status === 'read';
    return true;
  });

  const getNotificationDetails = (type) => {
    switch(type) {
      case 'alert':
        return { 
          icon: <AlertTriangle className="w-5 h-5" />,
          color: 'bg-red-900/20 text-red-400 border-red-900/30'
        };
      case 'reminder':
        return { 
          icon: <Clock className="w-5 h-5" />,
          color: 'bg-yellow-900/20 text-yellow-400 border-yellow-900/30'
        };
      case 'message':
        return { 
          icon: <Mail className="w-5 h-5" />,
          color: 'bg-blue-900/20 text-blue-400 border-blue-900/30'
        };
      default:
        return { 
          icon: <Info className="w-5 h-5" />,
          color: 'bg-gray-800/50 text-gray-400 border-gray-700/50' 
        };
    }
  };

  const handleNotificationClick = (id, type, proposalId) => {
    // navigate(`/chat/${proposalId}`);
    // console.log(type,'typeeeeeeeeeeeeeeeeee')
    if (type === 'proposalApproved' && proposalId) {
      navigate(`/chat/${proposalId}`);
    } else {
      navigate(`/notifications/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Navbar />
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <div className="animate-pulse space-y-6 pt-16">
            <div className="flex justify-between items-center">
              <div className="h-8 bg-gray-700 rounded w-1/3 mb-8" />
              <div className="h-10 bg-gray-700 rounded w-32" />
            </div>
            <div className="flex gap-2 mb-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-700 rounded w-24" />
              ))}
            </div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm shadow-lg border border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-gray-700 h-10 w-10" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-700 rounded w-3/4" />
                    <div className="h-3 bg-gray-700 rounded w-1/2" />
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-700 rounded w-20" />
                      <div className="h-6 bg-gray-700 rounded w-16" />
                    </div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="flex justify-between items-center mb-8 pt-16">
          <div>
            <h1 className="text-3xl font-bold text-gray-100 flex items-center">
              <Bell className="w-6 h-6 mr-2 text-indigo-500" />
              Notifications
            </h1>
            <p className="text-gray-400 mt-1 flex items-center gap-2">
              <span className="flex items-center">
                {notifications.length} total
              </span>
              {notifications.filter(n => n.status !== 'read').length > 0 && (
                <span className="flex items-center">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mx-2" />
                  {notifications.filter(n => n.status !== 'read').length} unread
                </span>
              )}
            </p>
          </div>
          
          {notifications.filter(n => n.status !== 'read').length > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 flex items-center gap-2 text-sm font-medium rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 hover:bg-indigo-600/20 transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              Mark all as read
            </button>
          )}
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-sm p-1 flex mb-6 border border-gray-700 w-fit">
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

        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16 bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700">
            <Bell className="h-20 w-20 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl text-gray-300 font-medium">
              No {activeFilter} notifications
            </h3>
            <p className="text-gray-400 mt-2">
              {activeFilter === 'all' 
                ? "You don't have any notifications yet" 
                : activeFilter === 'unread' 
                  ? "You've read all your notifications" 
                  : "You don't have any read notifications"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const { icon, color } = getNotificationDetails(notification.type);
              return (
                <div
                  key={notification._id}
                  onClick={() => handleNotificationClick(notification._id, notification.type, notification.proposalId)}
                  className={`
                    group flex items-start p-4 rounded-lg transition-all border
                    bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 cursor-pointer
                    ${notification.status !== 'read' 
                      ? 'border-l-4 border-indigo-500 border-r border-t border-b border-gray-700' 
                      : 'border border-gray-700'
                    }
                  `}
                >
                  <div className={`mr-4 p-2 rounded-lg ${color} border`}>
                    {icon}
                  </div>

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
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification._id);
                          }}
                          className="text-gray-400 hover:text-indigo-400 transition-colors ml-4"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>

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
                        <span className={`ml-3 px-2 py-1 rounded-md ${color} text-xs font-medium`}>
                          {notification.type}
                        </span>
                      )}
                      {notification.status === 'read' && (
                        <span className="ml-3 px-2 py-1 rounded-md bg-gray-700/30 text-gray-400 text-xs font-medium">
                          read
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default NotificationPage;