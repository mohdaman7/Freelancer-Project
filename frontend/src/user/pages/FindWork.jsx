import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Filter,
  DollarSign,
  Clock,
  Briefcase,
  Code,
  ChevronRight,
  Smartphone,
  Database,
  Palette,
  Search,
} from "lucide-react";
import Navbar from "../components/Navbar";

const FindWorkPage = () => {
  const [jobs, setJobs] = useState([]);
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    skills: "",
    minBudget: "",
    maxBudget: "",
    deadline: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/jobs/jobs",
          {
            params: filters,
          }
        );
        setJobs(response.data.data);
        setFeaturedJobs(response.data.data.slice(0, 3));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({ ...filters, search: searchTerm });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-red-500 text-xl">
        Error: {error}
      </div>
    );

  return (
    <div className="flex-wrap">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-18">
        <div
          className="relative py-24 px-6 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://img.pikbest.com/wp/202408/work-skill-3d-illustration-of-a-skilled-freelance-developer-working-on-laptop_9844918.jpg!sw800')",
          }}
        >
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Find Your Dream Project
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Connect with top clients and showcase your skills on CodeMesh
            </p>

            <form onSubmit={handleSearch} className="flex justify-center">
              <div className="relative w-full max-w-2xl">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for projects..."
                  className="p-4 rounded-full w-full bg-gray-800/50 text-white placeholder-gray-300/80 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600 backdrop-blur-sm shadow-xl"
                />
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70"
                  size={20}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/10 text-white/90 font-semibold py-2 px-6 rounded-full hover:bg-white/20 border border-white/20 transition-all duration-300 hover:shadow-lg"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Featured Opportunities
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-gray-700 group"
                >
                  <div className="h-3 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-blue-400 group-hover:text-blue-300 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {job.description}
                    </p>
                    <div className="flex justify-between items-center mb-4 text-sm">
                      <div className="flex items-center">
                        <DollarSign className="text-green-500 mr-1" size={16} />
                        <span>${job.budget}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="text-yellow-500 mr-1" size={16} />
                        <span>
                          {new Date(job.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/find-work/${job._id}`}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg block text-center transition duration-300 ease-in-out"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <div className="flex items-center mb-6">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Popular Categories
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  name: "Web Development",
                  icon: Code,
                  bgImg: "/api/placeholder/400/200?text=Web+Dev",
                  color: "blue",
                },
                {
                  name: "Mobile Apps",
                  icon: Smartphone,
                  bgImg: "/api/placeholder/400/200?text=Mobile",
                  color: "green",
                },
                {
                  name: "Data Science",
                  icon: Database,
                  bgImg: "/api/placeholder/400/200?text=Data",
                  color: "purple",
                },
                {
                  name: "UI/UX Design",
                  icon: Palette,
                  bgImg: "/api/placeholder/400/200?text=Design",
                  color: "pink",
                },
              ].map((category) => (
                <div
                  key={category.name}
                  className="relative rounded-lg overflow-hidden group cursor-pointer h-40"
                >
                  <img
                    src={category.bgImg}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-70 transition-opacity flex flex-col items-center justify-center text-center p-4">
                    <category.icon
                      className={`text-${category.color}-500 mb-2 transition-transform duration-300 group-hover:scale-110`}
                      size={48}
                    />
                    <h3 className="text-lg font-semibold text-white">
                      {category.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Latest Projects
                </h2>
              </div>
              <button
                onClick={toggleFilters}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center transition duration-300 ease-in-out shadow-md"
              >
                <Filter className="mr-2" size={18} /> Filters
              </button>
            </div>

            {showFilters && (
              <div className="mb-8 p-6 bg-gray-800 rounded-lg animate-fadeIn shadow-xl border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="skills"
                      placeholder="Skills (e.g. React, Node.js)"
                      value={filters.skills}
                      onChange={handleFilterChange}
                      className="w-full p-2 pl-10 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Code
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative w-1/2">
                      <input
                        type="number"
                        name="minBudget"
                        placeholder="Min Budget"
                        value={filters.minBudget}
                        onChange={handleFilterChange}
                        className="w-full p-2 pl-10 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <DollarSign
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                    </div>
                    <div className="relative w-1/2">
                      <input
                        type="number"
                        name="maxBudget"
                        placeholder="Max Budget"
                        value={filters.maxBudget}
                        onChange={handleFilterChange}
                        className="w-full p-2 pl-10 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <DollarSign
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="date"
                      name="deadline"
                      value={filters.deadline}
                      onChange={handleFilterChange}
                      className="w-full p-2 pl-10 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Clock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700 group"
                >
                  <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-blue-400 group-hover:text-blue-300 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {job.description}
                    </p>
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 mt-2">
                        {job.skillsRequired.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-900/50 px-2 py-1 rounded-full text-sm text-blue-300 border border-blue-900/80 backdrop-blur-sm"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skillsRequired.length > 3 && (
                          <span className="bg-blue-900/50 px-2 py-1 rounded-full text-sm text-blue-300 border border-blue-900/80 backdrop-blur-sm">
                            +{job.skillsRequired.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-4 text-sm">
                      <div className="flex items-center">
                        <DollarSign className="text-green-500 mr-1" size={16} />
                        <span>${job.budget}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="text-yellow-500 mr-1" size={16} />
                        <span>
                          {new Date(job.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/find-work/${job._id}`}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg block text-center transition duration-300 ease-in-out"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {jobs.length === 0 && (
              <div className="text-center py-16 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700">
                <Briefcase className="text-6xl text-gray-600 mx-auto mb-4 animate-pulse" />
                <h2 className="text-2xl font-semibold mb-2">No jobs found</h2>
                <p className="text-gray-400 max-w-md mx-auto">
                  Try adjusting your filters or search terms to find the perfect
                  project for your skills
                </p>
              </div>
            )}
          </section>

          <section className="mb-16">
            <div className="relative py-16 px-8 rounded-2xl overflow-hidden">
              <img
                src="/api/placeholder/1200/400?text=Developers+at+Work"
                alt="Developers collaborating"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
              <div className="relative z-10 max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                  What Our Developers Say
                </h2>
                <div className="mb-8">
                  <p className="text-xl italic text-gray-200 mb-6">
                    "CodeMesh completely transformed my freelancing career. I've
                    found high-quality clients, engaging projects, and a
                    supportive community all in one place!"
                  </p>
                  <div className="flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                      <img
                        src="http://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8NHx8bWFsZSUyMHByb2ZpbGV8fDB8fHx8MTYyNTY2NzI4OQ&ixlib=rb-1.2.1&q=80&w=1080"
                        alt="Developer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-white">John</h4>
                      <p className="text-sm text-gray-300">
                        Full Stack Developer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="text-center py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/[0.1] [mask-image:radial-gradient(white,transparent_70%)]"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
                Join CodeMesh today and connect with top clients, challenging
                projects, and a supportive developer community
              </p>
              <Link
                to="/get-started"
                className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition duration-300 inline-flex items-center text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                Get Started <ChevronRight className="ml-2" size={20} />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FindWorkPage;
