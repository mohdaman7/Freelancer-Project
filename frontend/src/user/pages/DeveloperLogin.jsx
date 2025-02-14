import { useState } from "react";
import axios from "axios";
import { Mail, Lock, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const DeveloperLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await axios.post("http://localhost:3000/api/developers/login", {
        email,
        password,
      });

      if (response.data) {
        toast.success("Login successful!");
        localStorage.setItem("token", response.data.token)
        localStorage.setItem('role', 'client');
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800/30 backdrop-blur-lg border-2 border-gray-700/50 rounded-2xl p-8 shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
          Welcome Back!
        </h1>
        <p className="text-gray-400 mb-8">
          Log in to your account to continue your journey with CodeMesh.
        </p>

        {error && (
          <div className="mb-4 p-4 bg-red-800/30 text-red-400 rounded-xl border border-red-700/50">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white transition-all pl-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-400" />
          </div>

          <div className="relative group">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white transition-all pl-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-400" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeveloperLogin;