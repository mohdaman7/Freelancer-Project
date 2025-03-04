import { useEffect, useState } from "react";
import axios from "axios";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotifications = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/notifications", {
            headers: { Authorization: `Bearer ${token}` },
          });
      
          console.log("API Response:", response.data); 
          const receivedData = response.data.data || response.data || [];
          console.log("Received Data:", receivedData); 
      
          if (!Array.isArray(receivedData)) {
            throw new Error("Invalid data format from server");
          }
      
          setNotifications(receivedData);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

    if (token) fetchNotifications();
  }, [token]);

  // Loading state
  if (loading) {
    return (
      <div className="p-6 text-gray-400 flex justify-center">
        <Bell className="animate-bounce w-8 h-8" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 text-red-400 text-center">
        <p>⚠️ Error loading notifications</p>
        <p className="text-sm mt-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Render notifications
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-3 text-blue-400">
        <Bell className="w-7 h-7" />
        Your Notifications
      </h1>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No notifications found
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className="p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 transition-all"
            >
              <p className="text-gray-100">{notification.message}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </span>
                {notification.jobId && (
                  <Link
                    to={`/job/${notification.jobId}`}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    View Job →
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPage;