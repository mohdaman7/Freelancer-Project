import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Check, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Mail, 
  X,
  ArrowLeft,
  CheckCircle 
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "./Navbar";
import Footer from "./Footer";

const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const NotificationDetail = () => {
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
        toast.error("Failed to fetch notification details");
      }
    };

    if (token) {
      fetchNotification();
    }
  }, [id, token]);

  const handlePayment = async (orderDetails) => {
    const isScriptLoaded = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!isScriptLoaded) {
      toast.error('Failed to load Razorpay SDK');
      return;
    }

    const options = {
      key: orderDetails.razorpayKey,
      amount: orderDetails.amount,
      currency: orderDetails.currency,
      name: "CodeMesh",
      description: "Proposal Payment",
      order_id: orderDetails.orderId,
      handler: async (response) => {
        try {
          await axios.post(`http://localhost:3000/api/notifications/confirm`, response, {
            headers: { Authorization: `Bearer ${token}` }
          });
          toast.success('Payment successful!');
          navigate("/notification");
        } catch (error) {
          toast.error('Payment verification failed');
        }
      },
      prefill: {
        email: "user@example.com",
      },
      theme: {
        color: "#5046e5",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleAction = async (action) => {
    try {
      if (action === 'approve') {
        const response = await axios.patch(
          `http://localhost:3000/api/notifications/${id}/approve`, 
          {}, 
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.orderId) {
          await handlePayment({
            orderId: response.data.orderId,
            razorpayKey: response.data.razorpayKey,
            amount: response.data.amount,
            currency: response.data.currency
          });
        }

        const updatedResponse = await axios.get(`http://localhost:3000/api/notifications/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotification(updatedResponse.data.data);
      } else {
        await axios.patch(`http://localhost:3000/api/notifications/${id}/reject`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const response = await axios.get(`http://localhost:3000/api/notifications/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotification(response.data.data);
      }

      toast.success(`Notification ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };



  if (!notification) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">No notification found.</p>
      </div>
    );
  }

  const status = notification?.status || "pending";

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-3xl pt-36 pb-20">
        <button 
          onClick={() => navigate("/notification")}
          className="mb-6 flex items-center gap-2 text-blue-500 hover:text-blue-400"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Notifications
        </button>
        
        {/* Notification Card */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">
                Notification Details
              </h1>
              <button
                onClick={() => navigate("/notification")}
                className="p-2 hover:bg-gray-700 rounded-full transition-all"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              ID: {notification._id}
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="p-3 rounded-lg bg-gray-700">
                {notification.type === 'alert' ? (
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                ) : notification.type === 'reminder' ? (
                  <Clock className="w-6 h-6 text-yellow-500" />
                ) : (
                  <Mail className="w-6 h-6 text-blue-500" />
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">
                  {notification.message}
                </h3>
                <div className="text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(notification.createdAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="capitalize">{notification.type}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            {status !== 'pending' && (
              <div className={`mt-6 p-4 rounded-lg ${
                status === 'approved' 
                  ? 'bg-green-900 bg-opacity-20 border border-green-800' 
                  : 'bg-red-900 bg-opacity-20 border border-red-800'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-opacity-20 bg-gray-700">
                    {status === 'approved' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">
                      {status === 'approved' 
                        ? 'Approved Successfully' 
                        : 'Request Rejected'}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {status === 'approved'
                        ? 'This request has been approved and processed.'
                        : 'This request has been rejected and archived.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {status === 'pending' && (
              <div className="mt-6 space-y-4">
                <h3 className="text-sm font-medium text-gray-300">Request Action</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleAction('approve')}
                    className="flex-1 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction('reject')}
                    className="flex-1 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
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