import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#1A1B1F]">
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-6xl font-bold text-white mb-6">
          Welcome to Questify
        </h1>
        <p className="text-xl text-[#8A8F98] mb-12">
          Your AI-powered document summarizer and Q&A platform. Simplify your
          documents and get answers instantly.
        </p>
        <div className="space-x-6">
          <Link
            to="/signup"
            className="bg-[#6C5CFF] text-white px-8 py-4 rounded-lg hover:bg-[#5A4AE0] transition-colors duration-300"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-[#1F2128] text-white px-8 py-4 rounded-lg border border-[#6C5CFF] hover:bg-[#2A2C34] transition-colors duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;