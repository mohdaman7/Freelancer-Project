import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";
import axios from "axios";
import { io } from "socket.io-client";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch initial notifications
  useEffect(() => {
    if (token) {
      axios
        .get("/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setNotifications(res.data))
        .catch((err) => console.error("Error fetching notifications:", err));
    }
  }, [token]);

  // Socket.IO setup
  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("notification", (newNotification) => {
      if (newNotification.userId === localStorage.getItem("userId")) {
        setNotifications((prev) => [newNotification, ...prev]);
      }
    });

    return () => socket.disconnect();
  }, []);

  const handleDecision = async (proposalId, status) => {
    try {
      await axios.post(
        `/api/proposal/decision`,
        { proposalId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error handling decision:", error);
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2">
        <Bell className="w-6 h-6" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Notifications</h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {notifications.map((notification) => (
            <div key={notification._id} className="p-2 border-b">
              <p>{notification.message}</p>
              {notification.type === "newProposal" && (
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleDecision(notification.proposalId, "approved")}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecision(notification.proposalId, "rejected")}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;