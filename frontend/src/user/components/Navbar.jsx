import { useState, useEffect } from "react";
import { Code, ChevronDown, User, LogOut, Briefcase, DollarSign, BarChart2, Bell } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { socket } from "../utils/Socket.jsx";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [developerId] = useState(localStorage.getItem("developerId"));
  const [unreadCount, setUnreadCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("developerId");
    setToken(null);
    setRole(null);
    navigate("/");
    toast.success("Logout successful");
    window.location.reload();
  };


  useEffect(() => {
    if (token) {
      const fetchUnreadCount = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/notifications/unread-count", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUnreadCount(response.data.count);
        } catch (error) {
          console.error("Error fetching unread notifications:", error);
          setUnreadCount(0);
        }
      };

      fetchUnreadCount();
      
      const interval = setInterval(fetchUnreadCount, 60000);
      return () => clearInterval(interval);
    }
  }, [token]);

 
  useEffect(() => {
    if (token) {
      const handleNewNotification = () => {
        setUnreadCount(prev => prev + 1);
      };

      socket.on("notification", handleNewNotification);
      return () => socket.off("notification", handleNewNotification);
    }
  }, [token]);

  const navLinkClass = "text-gray-300 hover:text-white transition-colors duration-200";
  const activeNavLinkClass = "text-white font-semibold";

  return (
    <nav className="fixed w-full z-50 bg-gray-900/95 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">

          <Link to="/" className="flex items-center gap-2 group">
            <Code className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
            <span className="font-bold text-xl text-white group-hover:text-gray-200 transition-colors duration-200">
              CodeMesh
            </span>
          </Link>


          <div className="hidden md:flex items-center gap-6">
            {!token ? (
              <>
                <Link to="/developers" className={`${navLinkClass} ${location.pathname === "/developers" && activeNavLinkClass}`}>
                  Hire Top Developers
                </Link>
                <Link to="/freelancer-register" className={`${navLinkClass} ${location.pathname === "/join" && activeNavLinkClass}`}>
                  Join as Developer
                </Link>
                <Link to="/how-it-works" className={`${navLinkClass} ${location.pathname === "/how-it-works" && activeNavLinkClass}`}>
                  How It Works
                </Link>
                <Link to="/pricing" className={`${navLinkClass} ${location.pathname === "/pricing" && activeNavLinkClass}`}>
                  Pricing
                </Link>
              </>
            ) : role === "developer" ? (
              <>
                <Link to="/find-work" className={`${navLinkClass} ${location.pathname === "/find-work" && activeNavLinkClass}`}>
                  Find Work
                </Link>
                <Link to="/freelancer-earnings" className={`${navLinkClass} ${location.pathname === "/freelancer-earnings" && activeNavLinkClass}`}>
                  Earnings
                </Link>
                <Link to="/my-projects" className={`${navLinkClass} ${location.pathname === "/my-projects" && activeNavLinkClass}`}>
                  My Projects
                </Link>
              </>
            ) : (
              <>
                <Link to="/developers" className={`${navLinkClass} ${location.pathname === "/developers" && activeNavLinkClass}`}>
                  Find Developers
                </Link>
                <Link to="/post-job" className={`${navLinkClass} ${location.pathname === "/post-job" && activeNavLinkClass}`}>
                  Post Project
                </Link>
                <Link to="/client-dashboard" className={`${navLinkClass} ${location.pathname === "/client-dashboard" && activeNavLinkClass}`}>
                  Dashboard
                </Link>
              </>
            )}
          </div>


          <div className="flex items-center gap-4">

            {token && (
              <Link 
                to="/notification" 
                className="relative p-2 hover:bg-gray-700 rounded-lg transition-colors group"
              >
                <Bell className="w-6 h-6 text-gray-300 group-hover:text-white" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transform translate-x-1 -translate-y-1 animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>
            )}


            {!token ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/get-started"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Get Started
                </Link>
              </>
            ) : (

              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <User className="w-5 h-5" />
                  <span>Account</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md overflow-hidden shadow-xl z-10">
                    <Link
                      to={`/freelancer-profile/${developerId}`}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                    >
                      <User className="w-4 h-4 inline-block mr-2" /> Profile
                    </Link>
                    {role === "developer" ? (
                      <>
                        <Link
                          to="/find-work"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                        >
                          <Briefcase className="w-4 h-4 inline-block mr-2" /> Find Work
                        </Link>
                        <Link
                          to="/freelancer-earnings"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                        >
                          <DollarSign className="w-4 h-4 inline-block mr-2" /> Earnings
                        </Link>
                      </>
                    ) : (
                      <Link
                        to="/client-dashboard"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                      >
                        <BarChart2 className="w-4 h-4 inline-block mr-2" /> Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4 inline-block mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;