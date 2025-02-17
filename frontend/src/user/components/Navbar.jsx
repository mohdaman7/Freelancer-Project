import { Code } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
    window.location.reload(); // Force refresh to update navbar state
  };

  return (
    <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Code className="w-8 h-8 text-blue-400" />
          <span className="font-bold text-xl text-white">CodeMesh</span>
        </div>

       
        <div className="flex items-center gap-6">
          {!token ? (
            <>
              <button className="text-gray-300 hover:text-white">Hire Top Developers</button>
              <button className="text-gray-300 hover:text-white">Join as Developer</button>
              <button className="text-gray-300 hover:text-white">How It Works</button>
              <button className="text-gray-300 hover:text-white">Pricing</button>
            </>
          ) : role === 'developer' ? (
            <>
              <Link to="/find-work" className="text-gray-300 hover:text-white">Find Work</Link>
              <Link to="/earnings" className="text-gray-300 hover:text-white">Earnings</Link>
              <Link to="/my-projects" className="text-gray-300 hover:text-white">My Projects</Link>
            </>
          ) : (
            <>
              <Link to="/developers" className="text-gray-300 hover:text-white">Find Developers</Link>
              <Link to="/post-job" className="text-gray-300 hover:text-white">Post Project</Link>
              <Link to="/client-dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
            </>
          )}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="flex gap-4">
          {!token ? (
            <>
              <Link to="/client-login" className="border border-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-lg">
                Sign In
              </Link>
              <Link to="/get-started" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Get Started
              </Link>
            </>
          ) : (
            <div className="flex gap-4 items-center">
              <Link to="/profile" className="text-gray-300 hover:text-white px-4 py-2 rounded-lg">
                Profile
              </Link>
              <button onClick={handleLogout} className="border border-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-lg">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;