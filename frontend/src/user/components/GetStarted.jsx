import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Briefcase, ChevronRight, Sparkles } from 'lucide-react';

const GetStartedPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isHovering, setIsHovering] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const getButtonText = () => {
    if (!selectedRole) return 'Select an Option';
    return selectedRole === 'client' ? 'Apply as a Client' : 'Apply as a Freelancer';
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-violet-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative w-full max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400 mb-4">
          Welcome to CodeMesh
        </h1>
        <p className="text-lg text-gray-300">Choose your journey and join our community of innovators</p>
      </div>

      <div className="relative w-full max-w-3xl mx-auto grid md:grid-cols-2 gap-6 px-4">
        
        <div 
          className="group"
          onMouseEnter={() => setIsHovering('client')}
          onMouseLeave={() => setIsHovering(null)}
          onClick={() => handleRoleSelect('client')}
        >
          <div className={`relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 transition-all duration-300 cursor-pointer
            ${selectedRole === 'client' 
              ? 'border-2 border-blue-500 shadow-lg shadow-blue-900/20' 
              : 'border border-gray-700 hover:shadow-lg hover:shadow-blue-900/20'}
            ${isHovering === 'client' ? 'transform -translate-y-1' : ''}
          `}>
            <div className="absolute top-6 right-6 flex items-center space-x-2">
              <div className={`w-6 h-6 border-2 rounded-full transition-colors duration-300 
                ${selectedRole === 'client' 
                  ? 'border-blue-500 bg-blue-500' 
                  : 'border-gray-600'}`} 
              />
              {isHovering === 'client' && <ChevronRight className="w-5 h-5 text-blue-500 animate-bounce-x" />}
            </div>
            <div className="mb-6">
              <div className="inline-block p-4 bg-gray-700/50 rounded-xl">
                <User className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-3">
              I'm a client
            </h2>
            <p className="text-gray-300">Hiring for a project</p>
          </div>
        </div>

       
        <div 
          className="group"
          onMouseEnter={() => setIsHovering('freelancer')}
          onMouseLeave={() => setIsHovering(null)}
          onClick={() => handleRoleSelect('freelancer')}
        >
          <div className={`relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 transition-all duration-300 cursor-pointer
            ${selectedRole === 'freelancer' 
              ? 'border-2 border-blue-500 shadow-lg shadow-blue-900/20' 
              : 'border border-gray-700 hover:shadow-lg hover:shadow-blue-900/20'}
            ${isHovering === 'freelancer' ? 'transform -translate-y-1' : ''}
          `}>
            <div className="absolute top-6 right-6 flex items-center space-x-2">
              <div className={`w-6 h-6 border-2 rounded-full transition-colors duration-300 
                ${selectedRole === 'freelancer' 
                  ? 'border-blue-500 bg-blue-500' 
                  : 'border-gray-600'}`} 
              />
              {isHovering === 'freelancer' && <ChevronRight className="w-5 h-5 text-blue-500 animate-bounce-x" />}
            </div>
            <div className="mb-6">
              <div className="inline-block p-4 bg-gray-700/50 rounded-xl">
                <Briefcase className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-3">
              I'm a freelancer
            </h2>
            <p className="text-gray-300">Looking for work</p>
          </div>
        </div>
      </div>

      
      <div className="relative mt-8 w-full max-w-3xl px-4">
        <Link
          to={selectedRole ? `/${selectedRole}-register` : '#'}
          className={`group w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-300
            ${selectedRole 
              ? 'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl shadow-blue-900/20'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
          `}
        >
          <Sparkles className={`w-5 h-5 transition-transform duration-300 ${selectedRole ? 'animate-pulse' : ''}`} />
          {getButtonText()}
          <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${selectedRole ? 'group-hover:translate-x-1' : ''}`} />
        </Link>
      </div>

     
      <div className="relative mt-6 text-center">
        <p className="text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default GetStartedPage;