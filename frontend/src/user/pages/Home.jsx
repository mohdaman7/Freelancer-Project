import { useState, useEffect } from 'react';
import { 
  Users, Shield, MessageSquare, 
  Check, Globe, GitBranch,
  Brain, Laptop,
  Coins, FileCode, BookOpen, Terminal, ThumbsUp
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const response = localStorage.getItem('role');
    setRole(response);
  }, []);

  const renderHeroButtons = () => {
    if (role === 'client') {
      return (
        <div className="flex gap-4 justify-center mb-12">
          <Link to="/post-job" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center group">
            Post a Project
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link to="/client-dashboard" className="border border-gray-700 text-gray-300 hover:text-white px-6 py-3 rounded-lg">
            My Projects
          </Link>
        </div>
      );
    }

    if (role === 'developer') {
      return (
        <div className="flex gap-4 justify-center mb-12">
          <Link to="/find-work" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center group">
            Find Work
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <button className="border border-gray-700 text-gray-300 hover:text-white px-6 py-3 rounded-lg">
            My Applications
          </button>
        </div>
      );
    }

    return (
      <div className="flex gap-4 justify-center mb-12">
        <Link to="/developers" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center group">
          Hire Developers
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        <Link to="/freelancer-register" className="border border-gray-700 text-gray-300 hover:text-white px-6 py-3 rounded-lg">
          Join as Developer
        </Link>
      </div>
    );
  };

  const renderCTAButtons = () => {
    if (role === 'client') {
      return (
        <>
          <Link to="/post-job" className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg">
            Start New Project
          </Link>
          <Link to="/client-dashboard" className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg">
            View Dashboard
          </Link>
        </>
      );
    }

    if (role === 'developer') {
      return (
        <>
          <Link to="/find-work" className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg">
            Browse Jobs
          </Link>
          <Link to='/freelancer-profile/:developerId' className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg">
            View Profile
          </Link>
        </>
      );
    }

    return (
      <>
        <Link to="/get-started" className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg">
          Start Project
        </Link>
        <Link to="/get-started" className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg">
          Join as Developer
        </Link>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-violet-900/20 to-transparent pointer-events-none" />
      <Navbar />


      <div className="container mx-auto px-4 pt-32 pb-20 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="bg-gray-800 text-blue-400 mb-4 py-2 px-4 rounded-full inline-block">
            Trusted by 10,000+ Developers Worldwide
          </div>
          
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-white">
              {role === 'client' ? 'Find Perfect Developers for' : 
               role === 'developer' ? 'Find Your Next Opportunity with' : 'Empower Your Ideas with the'}
            </span>
            <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              {role ? 'CodeMesh' : 'Best Developers'}
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {role === 'client' 
              ? 'Access pre-vetted developers ready to work on your project. Manage everything in one place.' 
              : role === 'developer'
              ? 'Connect with exciting projects and grow your career. Get paid for your expertise.'
              : 'Connect with expert developers for mentorship, bug fixes, and custom development. Build your next big idea with CodeMesh.'}
          </p>

          {renderHeroButtons()}
        </div>


        <div className="grid grid-cols-3 gap-6 mt-20">
          {[
            { icon: <Globe className="w-6 h-6" />, title: "Global Network", description: "Access developers from around the world", color: "text-blue-400" },
            { icon: <Brain className="w-6 h-6" />, title: "AI Matching", description: "Smart algorithm finds perfect matches", color: "text-violet-400" },
            { icon: <Shield className="w-6 h-6" />, title: "Secure Platform", description: "Protected payments & verified users", color: "text-green-400" },
            { icon: <GitBranch className="w-6 h-6" />, title: "Git Integration", description: "Seamless code collaboration", color: "text-orange-400" },
            { icon: <MessageSquare className="w-6 h-6" />, title: "Real-time Chat", description: "Instant communication", color: "text-pink-400" },
            { icon: <Coins className="w-6 h-6" />, title: "Escrow Payments", description: "Secure payment protection", color: "text-yellow-400" }
          ].map((feature, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-gray-800/80 transition-colors group">
              <div className="p-6">
                <div className={`${feature.color} bg-gray-700/50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </div>

          ))}
        </div>
      </div>



      <div className="bg-gray-800/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Development Services</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Comprehensive solutions tailored to your needs</p>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {[
              { icon: <Laptop className="w-8 h-8" />, title: "Web Development", price: "From $50/hr", features: ["Frontend", "Backend", "APIs"] },
              { icon: <Terminal className="w-8 h-8" />, title: "Bug Fixes", price: "From $30/hr", features: ["Quick Fixes", "Code Review", "Testing"] },
              { icon: <BookOpen className="w-8 h-8" />, title: "Mentorship", price: "From $40/hr", features: ["1-on-1", "Code Reviews", "Guidance"] },
              { icon: <FileCode className="w-8 h-8" />, title: "Custom Projects", price: "Custom Quote", features: ["Full Stack", "Management", "Support"] }
            ].map((service, index) => (
              <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden group hover:border-blue-500/50 transition-colors">
                <div className="p-6">
                  <div className="text-blue-400 mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-blue-400 font-semibold mb-4">{service.price}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-300 flex items-center gap-2">
                        <Check className="w-4 h-4 text-blue-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-4 gap-8">
            {[
              { icon: <FileCode className="w-8 h-8" />, title: "1. Post", description: "Describe requirements" },
              { icon: <Users className="w-8 h-8" />, title: "2. Match", description: "AI finds best matches" },
              { icon: <MessageSquare className="w-8 h-8" />, title: "3. Collaborate", description: "Work together" },
              { icon: <ThumbsUp className="w-8 h-8" />, title: "4. Deliver", description: "Project completion" }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-blue-600/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
                {index < 3 && <div className="absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-gray-700" />}
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {role === 'client' 
              ? 'Start Your Project Today' 
              : role === 'developer'
              ? 'Find Your Next Opportunity'
              : 'Transform Your Ideas'}
          </h2>
          <p className="text-lg mb-8 text-gray-100 max-w-2xl mx-auto">
            {role 
              ? 'Join our community of professionals creating amazing projects'
              : 'Join thousands of developers and businesses collaborating worldwide'}
          </p>
          <div className="flex gap-4 justify-center">
            {renderCTAButtons()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;