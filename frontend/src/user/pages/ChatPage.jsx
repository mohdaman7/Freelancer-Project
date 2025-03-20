import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Send, ArrowLeft, Loader2, Smile, CheckCheck } from "lucide-react";
import { socket } from "../utils/Socket.jsx";
import EmojiPicker from 'emoji-picker-react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TypingIndicator from "../components/TypingIndicator";

const ChatPage = () => {
  const { proposalId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatDetails, setChatDetails] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem(role === 'client' ? 'clientId' : 'developerId');
  const navigate = useNavigate();

  const fetchChat = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/chat/${proposalId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data.messages);
      setChatDetails(response.data);
      setLoading(false);
      markMessagesAsRead();
    } catch (err) {
      console.error("Chat load error:", err);
      setLoading(false);
    }
  }, [proposalId, token]);

  const markMessagesAsRead = async () => {
    try {
      await axios.post(`http://localhost:3000/api/chat/${proposalId}/mark-read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Mark read error:", err);
    }
  };

  useEffect(() => {
    fetchChat();

    const handleNewMessage = (message) => {
      setMessages(prev => [...prev, message]);
      markMessagesAsRead();
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
  }, [fetchChat, proposalId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    let tempId, tempMessage;

    try {
      tempId = Date.now().toString();
      tempMessage = {
        _id: tempId,
        content: newMessage.trim(),
        senderId: userId,
        senderRole: role,
        timestamp: new Date(),
        read: false
      };

      setMessages(prev => [...prev, tempMessage]);
      setNewMessage("");
      setShowEmoji(false);

      await axios.post(
        `http://localhost:3000/api/chat/${proposalId}`, 
        { content: tempMessage.content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      socket.emit("send-message", {
        proposalId,
        message: tempMessage
      });
    } catch (err) {
      console.error("Failed to send message:", err);
      setMessages(prev => prev.filter(msg => msg._id !== tempId));
      setNewMessage(tempMessage.content);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage(prev => prev + emoji.emoji);
    inputRef.current.focus();
  };

  const ParticipantInfo = ({ participant }) => {
    if (!participant) return null;

    return (
      <div className="flex items-center gap-3 p-4 border-b border-gray-700">
        <img 
          src={participant.profilePhoto || '/default-avatar.png'} 
          alt={participant.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{participant.name}</h3>
          <p className="text-sm text-gray-400">{participant.email}</p>
        </div>
      </div>
    );
  };

  const MessageBubble = ({ message }) => {
    const isCurrentUser = message.senderId === userId;
    const senderType = message.senderRole.toLowerCase(); // 'client' or 'developer'
    
    const participant = isCurrentUser 
      ? chatDetails.participants[senderType]
      : chatDetails.participants[senderType === 'client' ? 'developer' : 'client'];

    return (
      <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} gap-2`}>
        {!isCurrentUser && (
          <img
            src={participant.profilePhoto || '/default-avatar.png'}
            alt={participant.name}
            className="w-8 h-8 rounded-full mt-4"
          />
        )}
        <div className={`max-w-[70%] p-3 rounded-2xl ${
          isCurrentUser 
            ? 'bg-indigo-600 text-white rounded-br-none' 
            : 'bg-gray-700 text-gray-100 rounded-bl-none'
        }`}>
          <p className="text-sm break-words">{message.content}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs opacity-70">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
            {isCurrentUser && (
              <CheckCheck className={`w-4 h-4 ${
                message.read ? 'text-blue-300' : 'text-gray-400'
              }`} />
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl pt-36 pb-20">
        <div className="flex items-center mb-6 gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-800 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">
            {chatDetails?.jobId?.title || 'Chat'}
          </h1>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl">
          {chatDetails && (
            <ParticipantInfo 
              participant={chatDetails.participants[role === 'client' ? 'developer' : 'client']} 
            />
          )}

          <div className="h-[500px] overflow-y-auto p-4 space-y-4 relative">
            {messages.map((message) => (
              <MessageBubble key={message._id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-gray-700 relative">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowEmoji(!showEmoji)}
                className="p-2 hover:bg-gray-700 rounded-lg"
              >
                <Smile className="w-6 h-6 text-gray-400" />
              </button>
              
              <input
                ref={inputRef}
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  e.target.value ? socket.emit("typing", proposalId) : socket.emit("stop-typing", proposalId);
                }}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              
              <button
                type="submit"
                className="p-2 px-4 bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                disabled={!newMessage.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {showEmoji && (
              <div className="absolute bottom-16 left-4 z-10">
                <EmojiPicker
                  onEmojiClick={handleEmojiSelect}
                  theme="dark"
                  searchDisabled
                  skinTonesDisabled
                />
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatPage;