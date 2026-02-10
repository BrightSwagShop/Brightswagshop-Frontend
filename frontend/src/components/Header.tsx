import React from "react";
import logo from "../assets/logo.jpg";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-yellow-400">
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-3 items-center">
            
            {/* Left: Logo */}
            <div className="flex justify-start">
                <img
                    src={logo}
                    alt="Brightest logo"
                    className="h-20 w-auto"
                />
            </div>

            {/* Center: Navigation */}
            <nav className="hidden md:flex justify-center gap-6 text-gray-600 font-medium">
            <a className="hover:text-yellow-400 transition hover:cursor-">Home</a>
            <a className="hover:text-yellow-400 transition">Tests</a>
            <a className="hover:text-yellow-400 transition">About</a>
            <a className="hover:text-yellow-400 transition">Contact</a>
            </nav>


            <div className="grid grid-cols-2 items-center">
            {/* Cart (left side of right column) */}
            <div className="flex justify-center">
                <FaShoppingCart className="text-xl text-gray-600 hover:text-yellow-400 cursor-pointer transition" />
            </div>

            {/* Login (right side) */}
            <div className="flex justify-end">
                <button className="bg-yellow-400 text-white px-5 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
                    Login
                </button>
            </div>
        </div>
    </div>
    </header>

  );
};

export default Header;
