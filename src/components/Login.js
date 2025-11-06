import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { backend_url } from "../url";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ email: "", password: "" });
    
    try {
      const response = await axios.post(`${backend_url}/api/auth/login`, formData, {
        timeout: 10000, // 10 second timeout
      });
      login(response.data.token);
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        toast.error("Unable to connect to server. Please check your internet connection or try again later.");
      } else if (error.code === 'ECONNABORTED') {
        toast.error("Request timed out. Please try again.");
      } else if (error.response && error.response.status === 400) {
        setErrors({
          email: "Invalid email or password",
          password: "Invalid email or password",
        });
      } else if (error.response && error.response.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Login failed. Please try again.");
      }
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your Questify account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.email 
                    ? "border-red-300 focus:ring-red-500" 
                    : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                }`}
                placeholder="Enter your email"
                required
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.password 
                    ? "border-red-300 focus:ring-red-500" 
                    : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                }`}
                placeholder="Enter your password"
                required
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200 ${
                isLoading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button 
                onClick={() => navigate("/signup")}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;