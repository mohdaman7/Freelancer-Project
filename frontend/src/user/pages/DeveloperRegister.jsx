import { useState } from "react";
import axios from "axios";
import {
  Code,
  Mail,
  User,
  Lock,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  X,
  Award,
  Rocket,
  Plus,
  MapPin,
  Camera,
  CircleDollarSign,
  ChevronDown,
} from "lucide-react";
import {toast} from 'sonner'
import {useNavigate} from 'react-router-dom'


const DeveloperRegister = () => {
  const [step, setStep] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [otherSkill, setOtherSkill] = useState("");
  const [showOtherSkill, setShowOtherSkill] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    hourlyRate: "",
    country: "",
    profilePhoto: "",
    experienceLevel: "",
    // github: "",
    // linkedin: "",
    bio: "",
  });

  const skills = [
    { name: "React", color: "from-blue-500 to-blue-600" },
    { name: "Node.js", color: "from-green-500 to-green-600" },
    { name: "Python", color: "from-yellow-500 to-yellow-600" },
    { name: "TypeScript", color: "from-blue-600 to-blue-700" },
    { name: "AWS", color: "from-orange-500 to-orange-600" },
    { name: "JavaScript", color: "from-blue-400 to-blue-500" },
    { name: "Express", color: "from-pink-500 to-pink-600" },
    { name: "Flutter", color: "from-blue-300 to-blue-400" },
    { name: "Angular", color: "from-amber-500 to-amber-600" },
    { name: "Redis", color: "from-red-500 to-red-600" },
  ];

  const handleSkillToggle = (skill) => {
    if (skill === "Other") {
      setShowOtherSkill(!showOtherSkill);
      if (showOtherSkill) {
        setSelectedSkills((prev) => prev.filter((s) => s !== "Other"));
        setOtherSkill("");
      } else {
        setSelectedSkills((prev) => [...prev, "Other"]);
      }
    } else {
      setSelectedSkills((prev) =>
        prev.includes(skill)
          ? prev.filter((s) => s !== skill)
          : [...prev, skill]
      );
    }
  };

  const handleAddCustomSkill = () => {
    if (otherSkill.trim() && !selectedSkills.includes(otherSkill.trim())) {
      setSelectedSkills((prev) => [...prev, otherSkill.trim()]);
      setOtherSkill("");
      setShowOtherSkill(false);
    }
  };

  const steps = [
    {
      title: "Personal Details",
      description: "Let's start with your basic information",
      icon: <User className="w-5 h-5" />,
      content: (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative group">
              <input
                placeholder="First Name"
                className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white transition-all"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              <span className="absolute right-3 top-3.5 text-gray-400 group-focus-within:text-blue-400">
                <User size={18} />
              </span>
            </div>
            <div className="relative group">
              <input
                placeholder="Last Name"
                className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white transition-all"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
              <span className="absolute right-3 top-3.5 text-gray-400 group-focus-within:text-blue-400">
                <User size={18} />
              </span>
            </div>
          </div>

          <div className="relative group">
            <input
              className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white transition-all pl-12"
              placeholder="Email address"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-400" />
          </div>

          <div className="relative group">
            <input
              className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white transition-all pl-12"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-400" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative group">
              <input
                placeholder="Hourly Rate ($)"
                type="number"
                className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white transition-all"
                value={formData.hourlyRate}
                onChange={(e) =>
                  setFormData({ ...formData, hourlyRate: e.target.value })
                }
              />
              <CircleDollarSign className="absolute right-10 top-3.5 text-gray-400 group-focus-within:text-blue-400" />
            </div>
            <div className="relative group">
              <input
                placeholder="Country"
                className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white transition-all"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
              />
              <MapPin className="absolute right-3 top-3.5 text-gray-400 group-focus-within:text-blue-400" />
            </div>
          </div>

          <div className="relative group">
        <input
          placeholder="Professional Title (e.g., Full Stack Developer)"
          className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white transition-all"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />
        <Briefcase className="absolute right-3 top-3.5 text-gray-400 group-focus-within:text-blue-400" />
      </div>

      {/* Add Experience Level Field */}
      <div className="relative group">
        <select
          className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white appearance-none"
          value={formData.experienceLevel}
          onChange={(e) =>
            setFormData({ ...formData, experienceLevel: e.target.value })
          }
        >
          <option value="">Select Experience Level</option>
          <option value="Junior">Junior</option>
          <option value="Mid-Level">Mid-Level</option>
          <option value="Senior">Senior</option>
        </select>
        <ChevronDown className="absolute right-3 top-4 h-5 w-5 text-gray-400" />
      </div>

          <div className="relative group">
            <input
              placeholder="Profile Photo URL"
              className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white transition-all pl-12"
              value={formData.profilePhoto}
              onChange={(e) =>
                setFormData({ ...formData, profilePhoto: e.target.value })
              }
            />
            <Camera className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-400" />
          </div>
        </div>
      ),
    },
    {
      title: "Technical Expertise",
      description: "Showcase your core skills and technologies",
      icon: <Code className="w-5 h-5" />,
      content: (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <button
                key={skill.name}
                onClick={() => handleSkillToggle(skill.name)}
                className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                  selectedSkills.includes(skill.name)
                    ? `bg-gradient-to-r ${skill.color} text-white shadow-lg`
                    : "bg-gray-800/50 border-2 border-gray-700 text-gray-300 hover:border-blue-500"
                }`}
              >
                <span>{skill.name}</span>
                {selectedSkills.includes(skill.name) && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </button>
            ))}
            <button
              onClick={() => handleSkillToggle("Other")}
              className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                selectedSkills.includes("Other")
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-gray-800/50 border-2 border-gray-700 text-gray-300 hover:border-blue-500"
              }`}
            >
              <Plus className="w-4 h-4" />
              Other
            </button>
          </div>

          {showOtherSkill && (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter custom skill..."
                value={otherSkill}
                onChange={(e) => setOtherSkill(e.target.value)}
                onBlur={handleAddCustomSkill}
                onKeyPress={(e) => e.key === "Enter" && handleAddCustomSkill()}
                className="w-full px-4 py-2 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white transition-all"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {selectedSkills
              .filter((s) => s !== "Other")
              .map((skill, index) => (
                <div
                  key={index}
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl px-3 py-1.5"
                >
                  <span className="text-sm text-white mr-2">{skill}</span>
                  <button
                    onClick={() => handleSkillToggle(skill)}
                    className="hover:text-blue-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
          </div>

          {selectedSkills.length < 3 && (
            <div className="bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-xl p-4 text-center text-gray-400">
              <Rocket className="w-8 h-8 mx-auto mb-2" />
              Select at least 3 skills to showcase your expertise
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Professional Experience",
      description: "Highlight your achievements and career journey",
      icon: <Briefcase className="w-5 h-5" />,
      content: (
        <div className="space-y-4 animate-fade-in">
          <div className="relative group">
            <textarea
              placeholder="Describe your experience, projects, and achievements..."
              className="w-full h-48 px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white resize-none transition-all"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />
            <Award className="absolute right-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-400" />
          </div>
        </div>
      ),
    },
  ];

  const nextStep = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
  
      const finalData = {
        ...formData,
        skills: selectedSkills.filter((s) => s !== "Other").map((skill) => ({
          name: skill,
          experience: "Intermediate", // Default experience level
        })),
        experienceLevel: formData.experienceLevel,
        hourlyRate: Number(formData.hourlyRate),
        status: true,
        rating: 0,
        profilePhoto: formData.profilePhoto || "https://via.placeholder.com/150",
        githubUrl: formData.github,
        linkedinUrl: formData.linkedin,
      };
  
      const response = await axios.post(
        "http://localhost:3000/api/developers/register",
        finalData
      );
  
      if (response.data) {
        console.log("Registration successful:", response.data);
        toast.success("Registration successful!");
        navigate('/')
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
      toast.error("Registration failed. Please check your inputs.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            Join the CodeMesh Network
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Connect with global tech opportunities and showcase your skills to
            world-class teams
          </p>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-lg border-2 border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="mb-4 p-4 bg-red-800/30 text-red-400 rounded-xl border border-red-700/50">
              {error}
            </div>
          )}

          <div className="mb-8">
            <div className="flex justify-center gap-4 mb-6">
              {steps.map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                      index === step
                        ? "bg-gradient-to-r from-blue-600 to-violet-600 scale-110"
                        : index < step
                        ? "bg-blue-900/30 text-blue-400"
                        : "bg-gray-700/30 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`text-sm ${
                      index === step ? "text-blue-400" : "text-gray-400"
                    }`}
                  >
                    {steps[index].title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              {steps[step].icon}
              {steps[step].title}
            </h3>
            <p className="text-gray-400 mb-6">{steps[step].description}</p>
            {steps[step].content}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={step === 0}
              className={`px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all ${
                step === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "text-gray-300 hover:bg-gray-700/30 hover:text-white"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="text-sm text-gray-400">
              Step {step + 1} of {steps.length}
            </div>

            <button
              onClick={step === steps.length - 1 ? handleSubmit : nextStep}
              disabled={
                (step === 0 && (
                  !formData.firstName ||
                  !formData.lastName ||
                  !formData.email ||
                  !formData.password ||
                  !formData.hourlyRate ||
                  !formData.country
                )) ||
                (step === 1 && selectedSkills.length < 3) ||
                (step === 2 && !formData.bio) ||
                isSubmitting
              }
              className={`px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all ${
                step === 1 && selectedSkills.length < 3
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg"
              }`}
            >
              {isSubmitting ? "Submitting..." : step === steps.length - 1 ? "Complete Profile" : "Next Step"}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperRegister;