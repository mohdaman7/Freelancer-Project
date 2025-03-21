import { useState } from "react"
import axios from "axios"
import { Eye, EyeOff, ArrowLeft, User, Lock, Briefcase, Code, Globe } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

const ClientLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post("http://localhost:3000/api/client/login", formData)
      toast.success("Login successful!")
      localStorage.setItem("token", response.data.token)
      localStorage.setItem('role', 'client');
      navigate("/")
    } catch (error) {
      toast.error("Invalid credentials. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800/30 backdrop-blur-lg border-2 border-gray-700/50 rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden">
        <div className="md:flex">
        
          <div className="md:w-1/2 p-12">
            <Link
              to="/"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>

            <h2 className="text-3xl font-bold text-white mb-8">Welcome Back</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { label: "Email", icon: User, type: "email", key: "email" },
                { label: "Password", icon: Lock, type: "password", key: "password" },
              ].map((field) => (
                <div key={field.key}>
                  <label htmlFor={field.key} className="block text-sm font-medium text-gray-300 mb-1">
                    {field.label}
                  </label>
                  <div className="relative">
                    <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={field.key === "password" ? (showPassword ? "text" : "password") : field.type}
                      id={field.key}
                      name={field.key}
                      value={formData[field.key]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      required
                      className="w-full pl-10 pr-3 py-2 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white transition-all"
                    />
                    {field.key === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-800/50"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-violet-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <p className="mt-8 text-center text-gray-400">
              Don't have an account?{" "}
              <Link to="/client-register" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign up
              </Link>
            </p>
          </div>

        
          <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-violet-600 p-12 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6">Connect with Top Freelancers</h3>
              <p className="text-lg mb-8 text-blue-100">
                Access a world of talent and bring your projects to life with skilled professionals.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Briefcase, text: "Post your project and receive proposals" },
                { icon: Code, text: "Collaborate with expert developers" },
                { icon: Globe, text: "Work with talent from around the world" },
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <item.icon className="w-6 h-6 mr-3 text-blue-300" />
                  <span className="text-lg">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/female-freelancer-communicating-online-with-colleague-5379657-4518662.png?height=250&width=400"
                alt="Freelancer Illustration"
                className="w-full h-auto rounded-lg opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientLogin