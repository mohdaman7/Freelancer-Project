import { useState, useEffect } from "react"
import axios from "axios"
import {
  Star,
  Clock,
  MapPin,
  Verified,
  Award,
  Heart,
  Github,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  Users,
  TrendingUp,
  Zap,
} from "lucide-react"
import SearchAndFilter from "../components/SearchAndFillter";
import ClientReviews from "../components/ClientReviews";
import JobPostBanner from "../components/JobPostBanner";
import Footer from "../components/Footer";

const Developers = () => {
  const [developers, setDevelopers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({})
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const developersPerPage = 6

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get("http://localhost:3000/api/developer/profile")
        if (data.status === "success") {
          setDevelopers(data.data)
        } else {
          setError("Failed to fetch developers")
        }
      } catch (err) {
        setError("An error occurred while fetching developers")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDevelopers()
  }, [])

  const toggleFavorite = (developerId) => {
    setFavorites((prev) =>
      prev.includes(developerId) ? prev.filter((id) => id !== developerId) : [...prev, developerId],
    )
  }

  const indexOfLastDeveloper = currentPage * developersPerPage
  const indexOfFirstDeveloper = indexOfLastDeveloper - developersPerPage
  const currentDevelopers = developers.slice(indexOfFirstDeveloper, indexOfLastDeveloper)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="min-h-screen bg-[#0F172A] text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
              Discover Top Talent
            </h1>
            <p className="text-xl text-gray-400">Connect with extraordinary developers for your next big project</p>
          </div>
          <button className="mt-6 md:mt-0 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Post a Job
          </button>
        </div>

        <SearchAndFilter
          onSearch={(query) => setSearchQuery(query)}
          onFilterChange={(filters) => setFilters(filters)}
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-cyan-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 p-4 rounded-lg text-center">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {currentDevelopers.map((developer) => (
                <div
                  key={developer.id}
                  className="bg-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 hover:border-cyan-500"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={developer.profilePhoto || "/placeholder.svg"}
                      alt={developer.name}
                      className="w-20 h-20 rounded-xl object-cover border-2 border-cyan-500"
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white flex items-center">
                        {developer.name}
                        {developer.status && <Verified className="w-5 h-5 text-cyan-500 ml-2" />}
                      </h3>
                      <p className="text-gray-400">{developer.title}</p>
                      <p className="text-gray-500 flex items-center text-sm mt-1">
                        <MapPin className="w-4 h-4 mr-1 text-cyan-500" /> {developer.country}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleFavorite(developer.id)}
                      className="text-gray-400 hover:text-pink-500 transition-colors"
                    >
                      <Heart className="w-6 h-6" fill={favorites.includes(developer.id) ? "currentColor" : "none"} />
                    </button>
                  </div>

                  <p className="text-gray-400 mt-4 line-clamp-2">{developer.bio}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {developer.skills?.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-500 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full text-sm"
                      >
                        {typeof skill === "string" ? skill : skill.name}
                      </span>
                    ))}
                    {developer.skills?.length > 4 && (
                      <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                        +{developer.skills.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-5 h-5 mr-2 text-cyan-500" />
                      <span>${developer.hourlyRate}/hr</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Award className="w-5 h-5 mr-2 text-cyan-500" />
                      <span>{developer.experience?.experience}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Users className="w-5 h-5 mr-2 text-cyan-500" />
                      <span>{developer.projectsCompleted || 0} Projects</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Star className="w-5 h-5 mr-2 text-yellow-500" />
                      <span>{developer.rating || "N/A"} Rating</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex space-x-2">
                      {developer.githubUrl && (
                        <a
                          href={developer.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-gray-300 hover:text-white transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {developer.linkedinUrl && (
                        <a
                          href={developer.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-gray-300 hover:text-white transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center">
                      View Profile
                      <TrendingUp className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors disabled:opacity-50"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                {Array.from({ length: Math.ceil(developers.length / developersPerPage) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      currentPage === index + 1
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(developers.length / developersPerPage)}
                  className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors disabled:opacity-50"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </nav>
            </div>
          </>
        )}
      </div>
      <ClientReviews />
      <JobPostBanner />
      <Footer />
    </div>
  )
}

export default Developers