import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // Clear any existing token on mount to prevent weird states
  useState(() => {
    localStorage.removeItem("token");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      toast.success("Login Successful!");
      navigate("/app/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Left Side - Description */}
      <div className="hidden lg:flex lg:w-1/2 bg-green-600 p-12 flex-col justify-between text-white">
        <div>
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-green-600 font-bold text-2xl">W</div>
            <span className="text-3xl font-bold">WellBuddy</span>
          </div>

          <h1 className="text-4xl font-bold mb-6">Your Personal Wellness Companion</h1>

          <div className="space-y-4 text-lg">
            <p>Track your daily habits and build consistency towards a healthier lifestyle.</p>
            <p>Log workouts and monitor your fitness journey with detailed insights.</p>
            <p>Join exciting challenges and compete with friends on the leaderboard.</p>
            <p>Earn points for every achievement and stay motivated!</p>
          </div>
        </div>

        <div className="text-sm opacity-80">
          <p className="mb-2">Designed & Developed by:</p>
          <p className="font-semibold">SHREYAS R SUGUR, SHREYAS, SHREYANTH, SHREYA SHARMA</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">W</div>
            </div>

            <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 text-center mb-6">Login to continue your wellness journey</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg shadow-md hover:shadow-lg"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/users/signup" className="text-green-600 hover:text-green-700 font-semibold">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          {/* Mobile Credits */}
          <div className="lg:hidden mt-8 text-center text-sm text-gray-600">
            <p className="mb-1">Designed & Developed by:</p>
            <p className="font-semibold">SHREYAS R SUGUR, SHREYAS, SHREYANTH, SHREYA SHARMA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;