import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#1F2128] text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Questify
          <span className="text-sm font-normal ml-2 text-[#8A8F98]">- Simplify Your Documents</span>
        </Link>
        <div className="space-x-6">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-[#8A8F98] hover:text-white transition-colors duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/signup" className="text-[#8A8F98] hover:text-white transition-colors duration-300">
                Sign Up
              </Link>
              <Link to="/login" className="text-[#8A8F98] hover:text-white transition-colors duration-300">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;