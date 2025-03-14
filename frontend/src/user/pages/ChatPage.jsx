import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Send, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { socket } from "../utils/Socket.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";


const ChatPage = () => {
  const { proposalId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatDetails, setChatDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const fetchChat = useCallback(async () => {
    try {
      const response = await axios.get(`/api/chat/${proposalId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data.messages);
      setChatDetails(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load chat");
      setLoading(false);
    }
  }, [proposalId, token]);

  useEffect(() => {
    fetchChat();

    const handleNewMessage = (message) => {
      setMessages(prev => [...prev, message]);
    };

    socket.emit("join-chat", proposalId);
    socket.on("message", handleNewMessage);
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop-typing", () => setIsTyping(false));

    return () => {
      socket.off("message", handleNewMessage);
      socket.off("typing");
      socket.off("stop-typing");
      socket.emit("leave-chat", proposalId);
    };
  }, [proposalId, fetchChat]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const messageData = {
        content: newMessage.trim(),
        senderId: chatDetails.participants[role === 'client' ? 'client' : 'developer'],
        senderRole: role.charAt(0).toUpperCase() + role.slice(1)
      };

      // Optimistic update
      setMessages(prev => [...prev, {
        ...messageData,
        timestamp: new Date().toISOString()
      }]);
      setNewMessage("");

      await axios.post(`/api/chat/${proposalId}`, 
        { content: messageData.content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      socket.emit("send-message", {
        proposalId,
        message: messageData
      });
    } catch (err) {
      setError("Failed to send message");
      setNewMessage(messageData.content); // Restore message
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800 rounded-lg">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Chat Load Error</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl pt-36 pb-20">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-300" />
          </button>
          <h1 className="text-2xl font-bold text-gray-100">
            {chatDetails?.jobId?.title || 'Project Chat'}
          </h1>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                message={message}
                isCurrentUser={message.senderId === chatDetails.participants[role]}
              />
            ))}
            {isTyping && (
              <div className="text-gray-400 text-sm flex items-center pl-4">
                <div className="typing-indicator mr-2">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                {role === 'client' ? 'Developer' : 'Client'} is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="border-t border-gray-700 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  e.target.value ? socket.emit("typing", proposalId) : socket.emit("stop-typing", proposalId);
                }}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={!chatDetails}
              />
              <button
                type="submit"
                className="p-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                disabled={!newMessage.trim() || !chatDetails}
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const MessageBubble = ({ message, isCurrentUser }) => (
  <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-[70%] p-3 rounded-lg ${
      isCurrentUser 
        ? 'bg-indigo-600 text-white' 
        : 'bg-gray-700 text-gray-100'
    }`}>
      <p className="text-sm break-words">{message.content}</p>
      <p className="text-xs mt-1 opacity-70">
        {new Date(message.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>
    </div>
  </div>
);

export default ChatPage;