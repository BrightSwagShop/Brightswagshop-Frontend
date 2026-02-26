import React from "react";
import logo from "../assets/logo.png";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-yellow-400 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

        {/* Left: Logo + brand */}
          <div className="flex flex-col items-start gap-2">

                <img
                    src={logo}
                    alt="Brightest logo"
                    className="h-20 w-auto"
                />
          <p className="text-sm text-gray-500 max-w-xs">
            Brightest helps teams grow through smart tools, testing and high-quality swag.
          </p>
        </div>

        {/* Center: Navigation */}
        <div className="flex flex-col gap-3 text-gray-600 font-medium">
           
          <a className="hover:text-yellow-400 transition cursor-pointer">Home</a>
          <a className="hover:text-yellow-400 transition cursor-pointer">Tests</a>
          <a className="hover:text-yellow-400 transition cursor-pointer">About</a>
          <a className="hover:text-yellow-400 transition cursor-pointer">Contact</a>
        </div>

        {/* Right: Contact Brightest */}
        <div className="flex flex-col gap-3 text-gray-600">
          <span className="text-gray-800 font-semibold">Contact Brightest</span>

          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-yellow-400" />
            <span>+32 9 123 45 67</span>
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-yellow-400" />
            <span>contact@brightest.be</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Brightest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
