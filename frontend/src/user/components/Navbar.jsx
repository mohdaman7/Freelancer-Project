import { useState } from 'react';
import { Code, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        <div className="flex items-center gap-2">
          <Code className="w-8 h-8 text-blue-400" />
          <span className="font-bold text-xl text-white">CodeMesh</span>
        </div>

        
        <div className="hidden md:flex items-center gap-6">
          <button className="text-gray-300 hover:text-white">Hire Top Developers</button>
          <button className="text-gray-300 hover:text-white">Join as Developer</button>
          <button className="text-gray-300 hover:text-white">How It Works</button>
          <button className="text-gray-300 hover:text-white">Pricing</button>
        </div>

        
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        
        <div className="hidden md:flex gap-4">
          <button className="border border-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-lg">
            Sign In
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Get Started
          </button>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md">
          <div className="flex flex-col items-center gap-4 py-4">
            <button className="text-gray-300 hover:text-white">Hire Top Developers</button>
            <button className="text-gray-300 hover:text-white">Join as Developer</button>
            <button className="text-gray-300 hover:text-white">How It Works</button>
            <button className="text-gray-300 hover:text-white">Pricing</button>
            <button className="border border-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-lg w-40">
              Sign In
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-40">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
