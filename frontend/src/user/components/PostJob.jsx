import { useState } from "react";
import { 
  Zap, Calendar, DollarSign, Send, Briefcase, 
  Clock, Code, Users, Trophy, Target, 
  CheckCircle, TrendingUp, Globe 
} from "lucide-react";

export default function PostJob() {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    budget: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Data:", jobData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">
              Find Your Perfect Developer
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Post your job and connect with top-tier tech talent from around the world
            </p>
            <div className="flex justify-center space-x-8 text-purple-100">
              <div className="flex items-center">
                <Users className="w-6 h-6 mr-2" />
                <span>50k+ Developers</span>
              </div>
              <div className="flex items-center">
                <Trophy className="w-6 h-6 mr-2" />
                <span>98% Success Rate</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-6 h-6 mr-2" />
                <span>Global Talent Pool</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <Briefcase className="w-8 h-8 mr-3 text-purple-600" />
                Post Your Job
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="e.g. Senior Full Stack Developer for E-commerce Platform"
                    value={jobData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mb-2">
                    Job Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={6}
                    placeholder="Provide a detailed description of the project requirements, responsibilities, and expectations..."
                    value={jobData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="skillsRequired" className="block text-lg font-semibold text-gray-700 mb-2">
                    Required Skills
                  </label>
                  <input
                    type="text"
                    name="skillsRequired"
                    id="skillsRequired"
                    placeholder="e.g. React, Node.js, AWS, MongoDB"
                    value={jobData.skillsRequired}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="budget" className="block text-lg font-semibold text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="budget"
                        id="budget"
                        placeholder="Enter your budget"
                        value={jobData.budget}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="deadline" className="block text-lg font-semibold text-gray-700 mb-2">
                      Project Deadline
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        name="deadline"
                        id="deadline"
                        value={jobData.deadline}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold rounded-lg 
                    hover:from-purple-700 hover:to-indigo-600 transition duration-300 ease-in-out transform hover:scale-105 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Post Your Job</span>
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="lg:col-span-1 space-y-6">
            {/* Why Choose Us */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Why Choose Us</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Verified Developers</h4>
                    <p className="text-gray-600">All developers are pre-vetted and skill-tested</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-6 h-6 text-indigo-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Quick Matching</h4>
                    <p className="text-gray-600">Get matched with developers within 48 hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="w-6 h-6 text-pink-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Perfect Match</h4>
                    <p className="text-gray-600">AI-powered matching for your specific needs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-500 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Platform Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Active Developers</span>
                  <span className="font-bold">50,000+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Projects Completed</span>
                  <span className="font-bold">125,000+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Average Response Time</span>
                  <span className="font-bold">4 Hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Client Satisfaction</span>
                  <span className="font-bold">98%</span>
                </div>
              </div>
            </div>

            {/* Growth Chart */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Platform Growth</h3>
                <TrendingUp className="w-6 h-6 text-emerald-500" />
              </div>
              <p className="text-gray-600">
                Join our rapidly growing platform with over 5,000 new developers and 1,000 new projects monthly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-50 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">Global Community</h4>
              <p className="text-gray-600">Connect with developers from over 150 countries</p>
            </div>
            <div>
              <Zap className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">Fast Hiring</h4>
              <p className="text-gray-600">Hire within days, not weeks or months</p>
            </div>
            <div>
              <Code className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">Quality Work</h4>
              <p className="text-gray-600">Get high-quality work from skilled developers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}