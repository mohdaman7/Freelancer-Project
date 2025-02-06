import { useState } from "react";
import { Search, Filter, ChevronDown, X, Check, DollarSign } from "lucide-react";

const SearchAndFilter = ({ onSearch, onFilterChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    skills: [],
    experience: "",
    hourlyRate: { min: 0, max: 200 },
  });

  const skillsOptions = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Django",
    "HTML",
    "CSS",
    "Vue.js",
    "AWS",
    "Flutter",
    "Dart",
    "Firebase",
  ];

  const experienceOptions = ["Junior", "Mid-Level", "Senior"];
  const rateRanges = [
    { label: "Any Rate", value: [0, 200] },
    { label: "$0-$20", value: [0, 20] },
    { label: "$20-$50", value: [20, 50] },
    { label: "$50-$100", value: [50, 100] },
    { label: "$100-$200", value: [100, 200] },
  ];

  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleSkill = (skill) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter((s) => s !== skill)
      : [...filters.skills, skill];
    handleFilterChange("skills", newSkills);
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search developers..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
        </div>

        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-full transition-all duration-300"
        >
          <Filter className="w-5 h-5" />
          Filters
          <ChevronDown className={`w-5 h-5 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {isFilterOpen && ( 
        <div className="p-6 bg-gray-800 border border-gray-700 rounded-xl space-y-6">
          <div className="space-y-3">
            <h3 className="text-gray-300 font-semibold">Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {skillsOptions.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    filters.skills.includes(skill)
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  }`}
                >
                  {filters.skills.includes(skill) && <Check className="w-4 h-4" />}
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-gray-300 font-semibold">Experience Level</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {experienceOptions.map((level) => (
                <button
                  key={level}
                  onClick={() => handleFilterChange("experience", level)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filters.experience === level
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-gray-300 font-semibold">Hourly Rate</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {rateRanges.map(({ label, value: [min, max] }) => (
                <button
                  key={label}
                  onClick={() => handleFilterChange("hourlyRate", { min, max })}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                    filters.hourlyRate.min === min && filters.hourlyRate.max === max
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 px-6 py-4 bg-gray-700 rounded-xl">
              <input
                type="number"
                min="0"
                max="200"
                value={filters.hourlyRate.min}
                onChange={(e) => 
                  handleFilterChange("hourlyRate", {
                    ...filters.hourlyRate,
                    min: Math.min(Math.max(parseInt(e.target.value) || 0, 0), filters.hourlyRate.max)
                  })
                }
                className="w-24 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                placeholder="Min"
              />
              <span className="text-gray-400">to</span>
              <input
                type="number"
                min="0"
                max="200"
                value={filters.hourlyRate.max}
                onChange={(e) => 
                  handleFilterChange("hourlyRate", {
                    ...filters.hourlyRate,
                    max: Math.min(Math.max(parseInt(e.target.value) || 0, filters.hourlyRate.min), 200)
                  })
                }
                className="w-24 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                placeholder="Max"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {filters.skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm"
          >
            {skill}
            <button onClick={() => toggleSkill(skill)} className="hover:text-cyan-300">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {filters.experience && (
          <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
            {filters.experience}
            <button
              onClick={() => handleFilterChange("experience", "")}
              className="hover:text-cyan-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {(filters.hourlyRate.min > 0 || filters.hourlyRate.max < 200) && (
          <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
            ${filters.hourlyRate.min} - ${filters.hourlyRate.max}
            <button
              onClick={() => handleFilterChange("hourlyRate", { min: 0, max: 200 })}
              className="hover:text-cyan-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;