
import { useState } from "react"
import axios from "axios"
import { Eye, EyeOff, ArrowLeft, CheckCircle, User, Mail, Building, Lock } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner";

const ClientRegister = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError("")
    setIsLoading(true)

    try {
      const response = await axios.post("/api/register/client", formData)
      toast.success(response.data.message)
      navigate('/login')      
    } catch (error) {
        setApiError("Error registering client. Please try again later.",error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10" />

      <div className="relative z-20 w-full max-w-6xl bg-white bg-opacity-90 rounded-3xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          {/* Left Side - Information */}
          <div className="md:w-5/12 bg-gradient-to-br from-purple-600 to-blue-600 p-12 text-white flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-white hover:text-purple-200 transition-colors mb-12"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <h2 className="text-4xl font-bold mb-6">Join Our Network</h2>
              <p className="text-lg mb-8 text-purple-100">
                Create your client account and start hiring talented developers for your projects.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: CheckCircle, text: "Access to skilled developers" },
                { icon: CheckCircle, text: "Post unlimited projects" },
                { icon: CheckCircle, text: "Secure payment system" },
                { icon: CheckCircle, text: "24/7 customer support" },
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <item.icon className="w-6 h-6 mr-3 text-purple-300" />
                  <span className="text-lg">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="md:w-7/12 p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Create Your Account</h3>

            {apiError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">{apiError}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { label: "Full Name", icon: User, type: "text", key: "name" },
                { label: "Email", icon: Mail, type: "email", key: "email" },
                { label: "Company Name", icon: Building, type: "text", key: "company" },
                { label: "Password", icon: Lock, type: "password", key: "password" },
              ].map((field) => (
                <div key={field.key}>
                  <label htmlFor={field.key} className="block text-sm font-medium text-gray-700 mb-1">
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
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-8 text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientRegister

