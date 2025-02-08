import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, ArrowLeft, CheckCircle, User, Mail, Building, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ClientRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/client/register", formData);
      toast.success(response.data.message);
      navigate("/client-login");
    } catch (error) {
      setApiError("Error registering client. Please try again later.", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800/30 backdrop-blur-lg border-2 border-gray-700/50 rounded-2xl shadow-2xl max-w-6xl w-full overflow-hidden">
        <div className="md:flex">
          <div className="md:w-5/12 bg-gradient-to-br from-blue-600 to-violet-600 p-12 text-white flex flex-col justify-between">
            <div>
              <Link
                to="/"
                className="inline-flex items-center text-white hover:text-blue-200 transition-colors mb-12"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <h2 className="text-4xl font-bold mb-6">Join Our Network</h2>
              <p className="text-lg mb-8 text-blue-100">
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
                  <item.icon className="w-6 h-6 mr-3 text-blue-300" />
                  <span className="text-lg">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-7/12 p-12">
            <h3 className="text-3xl font-bold text-white mb-8">Create Your Account</h3>

            {apiError && (
              <div className="mb-6 p-4 bg-red-800/30 border border-red-700/50 text-red-400 rounded-lg">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { label: "Full Name", icon: User, type: "text", key: "name" },
                { label: "Email", icon: Mail, type: "email", key: "email" },
                { label: "Company Name", icon: Building, type: "text", key: "company" },
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-violet-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-8 text-center text-gray-400">
              Already have an account?{" "}
              <Link to="/client-login" className="text-blue-400 hover:text-blue-300 font-medium">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientRegister;