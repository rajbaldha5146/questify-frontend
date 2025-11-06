import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFileAlt, FaQuestionCircle, FaRocket, FaUsers, FaShieldAlt, FaChartLine } from "react-icons/fa";

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98 },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center bg-amber-50 border border-amber-200 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
              <span className="text-amber-700 text-sm font-medium">Enterprise-Grade Document Intelligence</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Documents into 
              <span className="text-emerald-600"> Actionable Insights</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Questify leverages advanced AI to extract, summarize, and analyze your documents with precision. 
              Streamline your workflow and make data-driven decisions faster than ever.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link
                  to="/signup"
                  className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200 shadow-lg"
                >
                  Get Started Free
                </Link>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link
                  to="/login"
                  className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold border-2 border-emerald-600 hover:bg-emerald-50 transition-colors duration-200"
                >
                  Sign In
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <FaUsers className="text-4xl text-amber-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">15,000+</h3>
              <p className="text-gray-300">Active Users</p>
            </div>
            <div className="p-6">
              <FaFileAlt className="text-4xl text-emerald-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">2.5M+</h3>
              <p className="text-gray-300">Documents Processed</p>
            </div>
            <div className="p-6">
              <FaChartLine className="text-4xl text-amber-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">99.2%</h3>
              <p className="text-gray-300">Accuracy Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for professionals who need reliable, fast, and secure document processing solutions.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <FaFileAlt className="text-emerald-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Intelligent Summarization
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Extract key information from complex documents automatically. Our AI identifies critical points, 
                saving you hours of manual review time.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                <FaQuestionCircle className="text-amber-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Document Q&A
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ask specific questions about your documents and receive precise answers. 
                Perfect for research, compliance, and knowledge extraction.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <FaRocket className="text-emerald-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                High-Speed Processing
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Process large documents in seconds with our optimized infrastructure. 
                Scale from single files to enterprise-level document workflows.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <FaShieldAlt className="text-5xl mx-auto mb-6 text-amber-300" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise Security Standards</h2>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Your documents are protected with bank-level encryption and compliance with industry standards. 
            We never store or share your sensitive information.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust Questify for their document intelligence needs.
          </p>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Link
              to="/signup"
              className="bg-amber-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-amber-400 transition-colors duration-200 shadow-lg"
            >
              Start Free Trial
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Questify</h3>
            <p className="text-gray-400 mb-6">
              © 2025 Questify Technologies. All rights reserved.
            </p>
            <div className="flex justify-center space-x-8">
              <button 
                onClick={() => alert('Privacy Policy - Coming Soon!')}
                className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => alert('Terms of Service - Coming Soon!')}
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => alert('Contact Us - Coming Soon!')}
                className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;