import {
    Star,
    MapPin,
    Verified,
    Heart,
    Share2,
    Mail,
    Github,
    Linkedin,
    ExternalLink,
    Clock,
    Award,
    Users,
  } from "lucide-react"
  
  const DeveloperCard = ( developer, isFavorite, onToggleFavorite ) => {
    return (
      <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
        {/* Header Section */}
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={developer.profilePhoto || "/placeholder.svg"}
              alt={developer.name}
              className="w-20 h-20 rounded-xl object-cover border-2 border-gray-700/50 group-hover:border-blue-500/50 transition-all duration-300"
            />
            <div className="absolute -bottom-3 -right-3 bg-gray-800 rounded-full p-1.5 border-2 border-gray-700/50 group-hover:border-blue-500/50 transition-all duration-300">
              <div className={`w-3 h-3 rounded-full ${developer.status ? "bg-green-500" : "bg-gray-500"}`} />
            </div>
          </div>
  
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white flex items-center group-hover:text-blue-400 transition-colors">
                  {developer.name}
                  {developer.status && <Verified className="w-4 h-4 text-blue-400 ml-2" />}
                </h3>
                <p className="text-gray-400 font-medium">{developer.title}</p>
                <p className="text-gray-500 flex items-center text-sm mt-1">
                  <MapPin className="w-4 h-4 mr-1" /> {developer.country}
                </p>
              </div>
              <button
                onClick={() => onToggleFavorite(developer.id)}
                className="text-gray-400 hover:text-red-400 transition-colors p-2 hover:bg-gray-700/50 rounded-full"
              >
                <Heart className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
  
        {/* Bio Section */}
        <p className="text-gray-400 mt-4 line-clamp-2 text-sm">{developer.bio}</p>
  
        {/* Skills Section */}
        <div className="flex flex-wrap gap-2 mt-4">
          {developer.skills?.slice(0, 4).map((skill, index) => (
            <span key={index} className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
              {typeof skill === "string" ? skill : skill.name}
            </span>
          ))}
          {developer.skills?.length > 4 && (
            <span className="bg-gray-700/50 text-gray-400 px-3 py-1 rounded-full text-sm font-medium">
              +{developer.skills.length - 4} more
            </span>
          )}
        </div>
  
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-400" />
                Hourly Rate
              </span>
              <span className="text-white font-semibold">${developer.hourlyRate}/hr</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 flex items-center">
                <Award className="w-4 h-4 mr-2 text-blue-400" />
                Experience
              </span>
              <span className="text-white font-semibold">{developer.experience?.experience}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 flex items-center">
                <Users className="w-4 h-4 mr-2 text-blue-400" />
                Projects
              </span>
              <span className="text-white font-semibold">{developer.completedProjects || 0}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                Rating
              </span>
              <span className="text-white font-semibold">{developer.rating || "N/A"}</span>
            </div>
          </div>
        </div>
  
        {/* Social Links */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700/50">
          <div className="flex space-x-2">
            {developer.githubUrl && (
              <a
                href={developer.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700/50 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {developer.linkedinUrl && (
              <a
                href={developer.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700/50 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-gray-700/50 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </button>
            <button className="p-2 bg-gray-700/50 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <span>View Profile</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  export default DeveloperCard