import { useState, useEffect } from "react";
import axios from "axios";
import {
  Star,
  Clock,
  MapPin,
  Verified,
  Award,
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

const Developers = () => {
  const [developers, setDevelopers] = useState([]); // State to store developer data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [favorites, setFavorites] = useState([]); // State to track favorite developers
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filters, setFilters] = useState({}); // State for filters
  const [error, setError] = useState(null); // State for error handling
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const developersPerPage = 6; // Number of developers to display per page

  // Fetch developers data from the backend
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("http://localhost:3000/api/developer/profile");
        if (data.status === "success") {
          setDevelopers(data.data); // Set developers data
        } else {
          setError("Failed to fetch developers");
        }
      } catch (err) {
        setError("An error occurred while fetching developers");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  // Toggle favorite developers
  const toggleFavorite = (developerId) => {
    setFavorites((prev) =>
      prev.includes(developerId)
        ? prev.filter((id) => id !== developerId)
        : [...prev, developerId]
    );
  };

  // Pagination logic
  const indexOfLastDeveloper = currentPage * developersPerPage;
  const indexOfFirstDeveloper = indexOfLastDeveloper - developersPerPage;
  const currentDevelopers = developers.slice(indexOfFirstDeveloper, indexOfLastDeveloper);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">Find Top Developers</h1>
        <SearchAndFilter
          onSearch={(query) => setSearchQuery(query)}
          onFilterChange={(filters) => setFilters(filters)}
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {currentDevelopers.map((developer) => (
                <div
                  key={developer.id}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={developer.profilePhoto || "/placeholder.svg"}
                      alt={developer.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white flex items-center">
                        {developer.name}
                        {developer.status && (
                          <Verified className="w-4 h-4 text-blue-400 ml-2" />
                        )}
                      </h3>
                      <p className="text-gray-400">{developer.title}</p>
                      <p className="text-gray-400 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" /> {developer.country}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleFavorite(developer.id)}
                      className="text-gray-400 hover:text-red-400 transition"
                    >
                      <Heart
                        className="w-5 h-5"
                        fill={
                          favorites.includes(developer.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  </div>

                  <p className="text-gray-300 mt-4">{developer.bio}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {developer.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                      >
                        {typeof skill === "string" ? skill : skill.name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-300 flex items-center">
                      <Clock className="w-4 h-4 mr-2" /> ${developer.hourlyRate}
                      /hr
                    </p>
                    <p className="text-gray-300 flex items-center">
                      <Award className="w-4 h-4 mr-2" />{" "}
                      {developer.experience?.experience}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-white font-medium">
                        {developer.rating || "N/A"}
                      </span>
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

                  <div className="flex mt-6">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                      View Profile
                    </button>
                    <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 m-1">
                      <Mail className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 m-1">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              {Array.from({ length: Math.ceil(developers.length / developersPerPage) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`mx-1 px-4 py-2 rounded-lg ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </>
        )}
      </div>
      <ClientReviews />
      <JobPostBanner />
      <Footer />
    </div>
  );
};

export default Developers;