import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Star,
  Briefcase,
  ChevronDown,
  Calendar,
  Clock,
  MapPin,
  Verified,
  Award,
  TrendingUp,
  Heart,
  Share2,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";
import SearchAndFilter from "../components/SearchAndFillter";
import ClientReviews from "../components/ClientReviews";
import JobPostBanner from "../components/JobPostBanner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Developers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState("rating");
  const [developers, setDevelopers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to fetch developers
    const fetchDevelopers = async () => {
      setIsLoading(true);
      // Replace this with actual API call in production
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                _id: "1",
                firstName: "Sarah",
                lastName: "Johnson",
                email: "sarah.johnson@example.com",
                profilePhoto:
                  "https://randomuser.me/api/portraits/women/68.jpg",
                bio: "Full-stack developer with 5+ years of experience specializing in React and Node.js ecosystems. Passionate about creating scalable and efficient web applications.",
                title: "Senior Full-Stack Developer",
                skills: [
                  { name: "React", experience: "Expert" },
                  { name: "Node.js", experience: "Expert" },
                  { name: "TypeScript", experience: "Expert" },
                  { name: "GraphQL", experience: "Intermediate" },
                ],
                programmingLanguages: ["JavaScript", "Python", "TypeScript"],
                hourlyRate: 75,
                availability: "Available",
                experienceLevel: "Senior",
                portfolioUrl: "https://portfolio.dev",
                githubUrl: "https://github.com",
                linkedinUrl: "https://linkedin.com",
                country: "United States",
                rating: 4.8,
                status: true,
                projectsCompleted: 32,
                totalEarned: 45000,
              },
              {
                _id: "2",
                firstName: "David",
                lastName: "Chen",
                email: "david.chen@example.com",
                profilePhoto: "https://randomuser.me/api/portraits/men/32.jpg",
                bio: "Backend specialist with a strong focus on scalable systems and cloud architecture. Experienced in building high-performance APIs and microservices.",
                title: "Senior Backend Developer",
                skills: [
                  { name: "Python", experience: "Expert" },
                  { name: "Django", experience: "Expert" },
                  { name: "PostgreSQL", experience: "Expert" },
                  { name: "Docker", experience: "Intermediate" },
                ],
                programmingLanguages: ["Python", "Go", "SQL"],
                hourlyRate: 85,
                availability: "Available",
                experienceLevel: "Senior",
                portfolioUrl: "https://portfolio.dev",
                githubUrl: "https://github.com",
                linkedinUrl: "https://linkedin.com",
                country: "Canada",
                rating: 4.9,
                status: true,
                projectsCompleted: 28,
                totalEarned: 52000,
              },
            ]),
          1000
        )
      );
      setDevelopers(response);
      setIsLoading(false);
    };

    fetchDevelopers();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]:
        typeof prev[filterType] === "object" && !Array.isArray(prev[filterType])
          ? { ...prev[filterType], ...value }
          : Array.isArray(prev[filterType])
          ? prev[filterType].includes(value)
            ? prev[filterType].filter((item) => item !== value)
            : [...prev[filterType], value]
          : value,
    }));
  };

  const toggleFavorite = (developerId) => {
    setFavorites((prev) =>
      prev.includes(developerId)
        ? prev.filter((id) => id !== developerId)
        : [...prev, developerId]
    );
  };

  const DeveloperCard = ({ developer }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500/50 transition-all hover:shadow-lg">
      <div className="flex items-start space-x-4 mb-4">
        <img
          src={developer.profilePhoto || "/placeholder.svg"}
          alt={`${developer.firstName} ${developer.lastName}`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white flex items-center">
                {`${developer.firstName} ${developer.lastName}`}
                {developer.status && (
                  <Verified className="w-4 h-4 text-blue-400 ml-2" />
                )}
              </h3>
              <p className="text-gray-400">{developer.title}</p>
              <p className="text-gray-400 flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {developer.country}
              </p>
            </div>
            <button
              onClick={() => toggleFavorite(developer._id)}
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              <Heart
                className="w-5 h-5"
                fill={
                  favorites.includes(developer._id) ? "currentColor" : "none"
                }
              />
            </button>
          </div>
        </div>
      </div>

      <p className="text-gray-300 mb-4">{developer.bio}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {developer.skills.map((skill) => (
          <div
            key={skill.name}
            className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm flex items-center"
          >
            {skill.name}
            <span className="ml-1 text-xs bg-blue-400/20 px-2 rounded-full">
              {skill.experience}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-gray-300">
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Hourly Rate
          </span>
          <span className="text-white font-medium">
            ${developer.hourlyRate}/hr
          </span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Availability
          </span>
          <span className="text-white font-medium">
            {developer.availability}
          </span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span className="flex items-center">
            <Award className="w-4 h-4 mr-2" />
            Experience
          </span>
          <span className="text-white font-medium">
            {developer.experienceLevel}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span className="text-white font-medium">{developer.rating}</span>
        </div>
        <div className="flex space-x-2">
          {developer.githubUrl && (
            <a
              href={developer.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {developer.linkedinUrl && (
            <a
              href={developer.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      <div className="flex space-x-3">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
          View Profile
        </button>
        <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors">
          <Mail className="w-5 h-5" />
        </button>
        <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="">
      {/* <Navbar /> */}
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h1 className="text-4xl font-bold text-white mb-2">
                Find Top Developers
              </h1>
              <p className="text-gray-300">
                Connect with vetted professionals for your next project
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors">
              <Briefcase className="w-5 h-5 mr-2" />
              Post a Job
            </button>
          </div>

          <div className="mb-10">
            <SearchAndFilter
              onSearch={(query) => {
                setSearchQuery(query);
                // Implement search logic here
              }}
              onFilterChange={(filters) => {
                setFilters(filters);
                // Implement filter logic here
              }}
            />
          </div>

          {/* Developers Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {developers.map((developer) => (
                <DeveloperCard key={developer._id} developer={developer} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <nav className="inline-flex rounded-md shadow">
              <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l-md hover:bg-gray-700">
                Previous
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                1
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700">
                2
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700">
                3
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-r-md hover:bg-gray-700">
                Next
              </button>
            </nav>
          </div>
        </div>
        <ClientReviews />
        <JobPostBanner />
        <Footer />
      </div>
    </div>
  );
};

export default Developers;
