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
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backend_url}/api/auth/login`, formData);
      login(response.data.token);
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors({
          email: "Invalid email or password",
          password: "Invalid email or password",
        });
      } else {
        toast.error("Login failed. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1B1F] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-[#1F2128] p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-white mb-8">Login</h2>
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#8A8F98] mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 bg-[#2A2C34] border ${
              errors.email ? "border-red-500" : "border-[#3A3D45]"
            } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6C5CFF]`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )}
        </div>
        <div className="mb-8">
          <label className="block text-sm font-medium text-[#8A8F98] mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-3 bg-[#2A2C34] border ${
              errors.password ? "border-red-500" : "border-[#3A3D45]"
            } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6C5CFF]`}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">{errors.password}</p>
          )}
        </div>
        <button type="submit" className="w-full bg-[#6C5CFF] text-white p-3 rounded-lg hover:bg-[#5A4AE0] transition-colors duration-300">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;