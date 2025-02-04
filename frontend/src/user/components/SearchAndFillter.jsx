import { useState } from "react"
import { Search, SlidersHorizontal, Briefcase, MapPin, TrendingUp, X, Check } from "lucide-react"

const SearchAndFilter = ({ onSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState({
    skills: [],
    experience: [],
    location: [],
    sortBy: "relevance",
  })

  const skills = [
    "React",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
    "AWS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "MongoDB",
  ]

  const experiences = ["Entry Level", "Mid Level", "Senior", "Lead", "Architect"]

  const locations = [
    "Remote",
    "United States",
    "Europe",
    "Asia",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "India",
  ]

  const sortOptions = [
    { id: "relevance", label: "Most Relevant" },
    { id: "recent", label: "Most Recent" },
    { id: "rating", label: "Highest Rated" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
  ]

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    onSearch(e.target.value)
  }

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const toggleFilter = (type, value) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev }
      if (type === "sortBy") {
        newFilters[type] = value
      } else {
        if (newFilters[type].includes(value)) {
          newFilters[type] = newFilters[type].filter((item) => item !== value)
        } else {
          newFilters[type] = [...newFilters[type], value]
        }
      }
      onFilterChange(newFilters)
      return newFilters
    })
  }

  const Dropdown = ({ type, items, isSort = false }) => (
    <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700/50 p-3 z-50">
      {!isSort ? (
        <div className="space-y-2">
          {items.map((item) => (
            <label
              key={item}
              className="flex items-center space-x-3 p-2 hover:bg-gray-700/50 rounded-md cursor-pointer group"
            >
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                ${
                  selectedFilters[type].includes(item)
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-600 group-hover:border-gray-400"
                }`}
              >
                {selectedFilters[type].includes(item) && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-gray-300 group-hover:text-white">{item}</span>
            </label>
          ))}
        </div>
      ) : (
        <div className="space-y-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleFilter("sortBy", item.id)}
              className={`w-full text-left p-2 rounded-md transition-colors
                ${
                  selectedFilters.sortBy === item.id
                    ? "bg-blue-500/20 text-blue-400"
                    : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg">
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search developers by skills, name, or keywords..."
          className="w-full pl-10 pr-4 py-3 bg-gray-900/50 backdrop-blur-sm text-white rounded-lg border border-gray-700/50 
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                     placeholder-gray-400 transition-all"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Skills Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("skills")}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all
              ${
                activeDropdown === "skills"
                  ? "bg-blue-500/20 text-blue-400 border-blue-500/50"
                  : "bg-gray-900/50 text-gray-300 border-gray-700/50 hover:bg-gray-700/50 hover:text-white"
              }
              border backdrop-blur-sm`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Skills</span>
            <span className="text-xs bg-blue-500/20 px-2 py-0.5 rounded-full ml-2">
              {selectedFilters.skills.length || "0"}
            </span>
          </button>
          {activeDropdown === "skills" && <Dropdown type="skills" items={skills} />}
        </div>

        {/* Experience Level Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("experience")}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all
              ${
                activeDropdown === "experience"
                  ? "bg-blue-500/20 text-blue-400 border-blue-500/50"
                  : "bg-gray-900/50 text-gray-300 border-gray-700/50 hover:bg-gray-700/50 hover:text-white"
              }
              border backdrop-blur-sm`}
          >
            <Briefcase className="w-5 h-5" />
            <span>Experience</span>
            <span className="text-xs bg-blue-500/20 px-2 py-0.5 rounded-full ml-2">
              {selectedFilters.experience.length || "0"}
            </span>
          </button>
          {activeDropdown === "experience" && <Dropdown type="experience" items={experiences} />}
        </div>

        {/* Location Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("location")}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all
              ${
                activeDropdown === "location"
                  ? "bg-blue-500/20 text-blue-400 border-blue-500/50"
                  : "bg-gray-900/50 text-gray-300 border-gray-700/50 hover:bg-gray-700/50 hover:text-white"
              }
              border backdrop-blur-sm`}
          >
            <MapPin className="w-5 h-5" />
            <span>Location</span>
            <span className="text-xs bg-blue-500/20 px-2 py-0.5 rounded-full ml-2">
              {selectedFilters.location.length || "0"}
            </span>
          </button>
          {activeDropdown === "location" && <Dropdown type="location" items={locations} />}
        </div>

        {/* Sort By */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("sortBy")}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all
              ${
                activeDropdown === "sortBy"
                  ? "bg-blue-500/20 text-blue-400 border-blue-500/50"
                  : "bg-gray-900/50 text-gray-300 border-gray-700/50 hover:bg-gray-700/50 hover:text-white"
              }
              border backdrop-blur-sm`}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Sort By</span>
          </button>
          {activeDropdown === "sortBy" && <Dropdown type="sortBy" items={sortOptions} isSort />}
        </div>
      </div>

      {/* Selected Filters */}
      {Object.entries(selectedFilters).some(([key, value]) =>
        Array.isArray(value) ? value.length > 0 : value !== "relevance",
      ) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(selectedFilters).map(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
              return value.map((item) => (
                <span
                  key={`${key}-${item}`}
                  className="inline-flex items-center bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm"
                >
                  {item}
                  <button onClick={() => toggleFilter(key, item)} className="ml-2 hover:text-blue-300">
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))
            }
            return null
          })}
          {selectedFilters.sortBy !== "relevance" && (
            <span className="inline-flex items-center bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm">
              {sortOptions.find((opt) => opt.id === selectedFilters.sortBy)?.label}
              <button onClick={() => toggleFilter("sortBy", "relevance")} className="ml-2 hover:text-blue-300">
                <X className="w-4 h-4" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchAndFilter