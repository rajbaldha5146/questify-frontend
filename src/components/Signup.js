import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { backend_url } from "../url";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backend_url}/api/auth/signup`, formData);
      localStorage.setItem("token", response.data.token);
      toast.success("Signup successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1B1F] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-[#1F2128] p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-white mb-8">Sign Up</h2>
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#8A8F98] mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 bg-[#2A2C34] border border-[#3A3D45] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6C5CFF]"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#8A8F98] mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-[#2A2C34] border border-[#3A3D45] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6C5CFF]"
            required
          />
        </div>
        <div className="mb-8">
          <label className="block text-sm font-medium text-[#8A8F98] mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 bg-[#2A2C34] border border-[#3A3D45] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6C5CFF]"
            required
          />
        </div>
        <button type="submit" className="w-full bg-[#6C5CFF] text-white p-3 rounded-lg hover:bg-[#5A4AE0] transition-colors duration-300">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;