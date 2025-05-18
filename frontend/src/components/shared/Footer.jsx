import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
<footer className="bg-purple-900 text-white px-5 py-3 fixed bottom-0 left-0 w-full z-50">
<div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo & Copyright */}
        <div className="text-center md:text-left">
          <h1 className="text-xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
          <p className="text-sm mt-1">&copy; 2025 JobPortal. All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/jobs" className="hover:text-gray-400">Jobs</Link>
          <Link to="/about" className="hover:text-gray-400">About</Link>
          <Link to="/contact" className="hover:text-gray-400">Contact</Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-blue-400"><Facebook /></a>
          <a href="#" className="hover:text-blue-400"><Twitter /></a>
          <a href="#" className="hover:text-blue-400"><Linkedin /></a>
          <a href="#" className="hover:text-blue-400"><Instagram /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
