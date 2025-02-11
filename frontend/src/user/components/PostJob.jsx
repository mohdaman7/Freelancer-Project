import { useState } from "react";
import { Zap, Calendar, DollarSign, Send, Briefcase, Clock, Code } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 flex items-center justify-center">
            <Briefcase className="w-10 h-10 mr-3 text-blue-600" />
            Post a New Job
          </h1>
          <p className="mt-3 text-lg text-blue-600">
            Find the perfect developer for your next project
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-white/90 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 rounded-t-lg">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-blue-50">
                <Clock className="w-5 h-5" />
                <span>Quick and easy job posting process</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-50">
                <Code className="w-5 h-5" />
                <span>Access to top developer talent</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-50">
                <Zap className="w-5 h-5" />
                <span>Fast response from qualified candidates</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
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
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
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
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-lg 
                    hover:from-blue-700 hover:to-cyan-600 transition duration-300 ease-in-out transform hover:scale-105 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Post Your Job</span>
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}