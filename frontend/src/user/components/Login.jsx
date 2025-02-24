import { Link } from 'react-router-dom';
import { Code, Briefcase, ArrowRight } from 'lucide-react';

const LoginSelection = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
     
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to <span className="text-blue-400">CodeMesh</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Choose your login method to continue
          </p>
        </div>

   
        <div className="grid md:grid-cols-2 gap-8">
        
          <Link 
            to="/freelancer-login"
            className="group relative bg-gray-800/50 border-2 border-gray-700 rounded-2xl p-8 transition-all duration-300 hover:border-blue-500 hover:scale-105"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-500/20 rounded-xl">
                  <Code className="w-8 h-8 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Developer Login</h2>
              </div>
              <p className="text-gray-400">
                Access your developer account to manage projects, bids, and earnings
              </p>
              <div className="flex items-center gap-2 text-blue-400 mt-6">
                <span>Continue as Developer</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

      
          <Link 
            to="/client-login"
            className="group relative bg-gray-800/50 border-2 border-gray-700 rounded-2xl p-8 transition-all duration-300 hover:border-purple-500 hover:scale-105"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-purple-500/20 rounded-xl">
                  <Briefcase className="w-8 h-8 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Client Login</h2>
              </div>
              <p className="text-gray-400">
                Access your client account to post projects and manage developers
              </p>
              <div className="flex items-center gap-2 text-purple-400 mt-6">
                <span>Continue as Client</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>

        
        <div className="text-center mt-8">
          <p className="text-gray-400">
            `Don't have an account?{' '}`
            <Link 
              to="/get-started" 
              className="text-blue-400 hover:text-blue-300 underline transition-colors"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSelection;