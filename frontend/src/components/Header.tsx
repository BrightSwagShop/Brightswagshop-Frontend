import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../assets/Brightest-logo's/logo.png";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 w-full bg-white z-50 transition-all duration-300 ${
      isScrolled ? "shadow-md" : ""
    }`}>
      <div className={`max-w-7xl mx-auto px-16 flex items-center justify-between transition-all duration-300 ${
        isScrolled ? "h-14" : "h-25"
      }`}>

        {/* Logo */}
        <Link
          to="/"
          data-testid="logo-link"
          className="flex items-center gap-3"
        >
          <img
            src={logo}
            alt="Brightest logo"
            className="h-18 w-auto"
            data-testid="logo-image"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-[#3C3C3B] font-medium">

          <Link
            to="/login"
            data-testid="login-link"
            className="flex items-center gap-2 hover:text-yellow-500 transition font-ttnorms font-bold"
          >
            LogIn
          </Link>

          <Link
            to="/about"
            data-testid="about-link"
            className="flex items-center gap-2 hover:text-yellow-500 transition font-ttnorms font-bold"
          >
            About
          </Link>

          <Link
            to="/contact"
            data-testid="contact-link"
            className="hover:text-yellow-500 transition font-ttnorms font-bold"
          >
            Contact
          </Link>

        </nav>

        {/* Icons */}
        <div className="hidden lg:flex items-center gap-6 text-gray-700 font-medium">

          <Link
            to="/favoriten"
            data-testid="favorites-link"
            className="flex items-center gap-4 hover:text-yellow-500 transition"
          >
            <FaRegHeart
              className="text-lg cursor-pointer"
              data-testid="favorites-icon"
            />
          </Link>

          <Link
            to="/winkelwagen"
            data-testid="cart-link"
            className="flex items-center gap-4 text-gray-800 hover:text-yellow-500 transition"
          >
            <FiShoppingCart
              className="text-xl cursor-pointer"
              data-testid="cart-icon"
            />
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Header;