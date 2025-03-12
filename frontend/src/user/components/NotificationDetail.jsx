import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Check, XCircle, Clock, AlertTriangle, Mail, Loader, X } from "lucide-react";
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

        console.log("API Response:", response.data); 
        setNotification(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notification:", error); // Log the error
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
      name: "Freelancer WebApp",
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
        email: "user@example.com", // Replace with actual user email from your auth state
      },
      theme: {
        color: "#3399cc",
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

        // Handle Razorpay integration
        if (response.data.orderId) {
          await handlePayment({
            orderId: response.data.orderId,
            razorpayKey: response.data.razorpayKey,
            amount: response.data.amount,
            currency: response.data.currency
          });
        }

        // Refresh notification status
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
      console.error("Failed to perform action", error);
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Loader className="animate-spin h-12 w-12 text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
          <div className="inline-block p-6 bg-red-100 rounded-full mb-6">
            <XCircle className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Notification
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => navigate("/notification")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium"
          >
            Back to Notifications
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (!notification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <p className="text-gray-600">No notification found.</p>
      </div>
    );
  }

  const status = notification?.status || "pending"; // Fallback to "pending" if status is null/undefined

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Notification Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                Notification Details
              </h1>
              <button
                onClick={() => navigate("/notification")}
                className="p-2 hover:bg-gray-50 rounded-full transition-all"
              >
                <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              ID: {notification._id}
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`p-3 rounded-lg ${
                notification.type === 'alert' ? 'bg-red-100' :
                notification.type === 'reminder' ? 'bg-yellow-100' : 'bg-blue-100'
              }`}>
                {notification.type === 'alert' ? (
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                ) : notification.type === 'reminder' ? (
                  <Clock className="w-6 h-6 text-yellow-500" />
                ) : (
                  <Mail className="w-6 h-6 text-blue-500" />
                )}
              </div>


              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {notification.message}
                </h3>
                <div className="text-sm text-gray-500">
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
                    <span className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    <span className="capitalize">{notification.type}</span>
                  </div>
                </div>
              </div>
            </div>


            {status === 'pending' && (
              <div className="mt-6 space-y-4">
                <h3 className="text-sm font-medium text-gray-700">Request Action</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleAction('approve')}
                    className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction('reject')}
                    className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Reject
                  </button>
                </div>
              </div>
            )}

            {/* Status */}
            {status !== 'pending' && (
              <div className={`mt-6 p-4 rounded-lg ${
                status === 'approved' 
                  ? 'bg-green-50 border border-green-100' 
                  : 'bg-red-50 border border-red-100'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    status === 'approved' 
                      ? 'bg-green-100' 
                      : 'bg-red-100'
                  }`}>
                    {status === 'approved' ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {status === 'approved' 
                        ? 'Approved Successfully' 
                        : 'Request Rejected'}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {status === 'approved'
                        ? 'This request has been approved and processed.'
                        : 'This request has been rejected and archived.'}
                    </p>
                  </div>
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