import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // For animations
import { FaFileAlt, FaQuestionCircle, FaRocket } from "react-icons/fa"; // Icons for features

const HomePage = () => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1B1F] to-[#2A2C34] text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Welcome to <span className="text-[#6C5CFF]">Questify</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#8A8F98] mb-12 max-w-3xl mx-auto">
            Your AI-powered document summarizer and Q&A platform. Simplify your
            documents and get answers instantly with the power of AI.
          </p>
          <div className="space-x-6">
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="inline-block"
            >
              <Link
                to="/signup"
                className="bg-[#6C5CFF] text-white px-8 py-4 rounded-lg shadow-lg hover:bg-[#5A4AE0] transition-colors duration-300 text-lg font-semibold"
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="inline-block"
            >
              <Link
                to="/login"
                className="bg-transparent text-white px-8 py-4 rounded-lg border-2 border-[#6C5CFF] hover:bg-[#6C5CFF] hover:text-white transition-colors duration-300 text-lg font-semibold"
              >
                Login
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
            Why Choose Questify?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              className="bg-[#1F2128] p-6 rounded-lg shadow-lg hover:bg-[#2A2C34] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <FaFileAlt className="text-[#6C5CFF] text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Document Summarization
              </h3>
              <p className="text-[#8A8F98]">
                Upload your documents and get concise, accurate summaries in
                seconds.
              </p>
            </motion.div>
            {/* Feature 2 */}
            <motion.div
              className="bg-[#1F2128] p-6 rounded-lg shadow-lg hover:bg-[#2A2C34] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <FaQuestionCircle className="text-[#6C5CFF] text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Instant Q&A
              </h3>
              <p className="text-[#8A8F98]">
                Ask questions about your documents and get instant, AI-generated
                answers.
              </p>
            </motion.div>
            {/* Feature 3 */}
            <motion.div
              className="bg-[#1F2128] p-6 rounded-lg shadow-lg hover:bg-[#2A2C34] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <FaRocket className="text-[#6C5CFF] text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Fast & Efficient
              </h3>
              <p className="text-[#8A8F98]">
                Experience lightning-fast processing with our advanced AI
                technology.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F2128] py-8 text-center">
        <p className="text-[#8A8F98]">
          © 2025 Questify. All rights reserved.
        </p>
        <div className="mt-4 space-x-4">
          <a href="" className="text-[#6C5CFF] hover:underline">
            Privacy Policy
          </a>
          <a href="" className="text-[#6C5CFF] hover:underline">
            Terms of Service
          </a>
          <a href="" className="text-[#6C5CFF] hover:underline">
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;