import { Link } from "react-router-dom";
import logo from "../assets/Brightest-logo's/logoFooter.png";
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-yellow-400 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[120px_1fr_180px] items-start gap-x-6">

        {/* Logo */}
        <div>
          <Link to="/" data-testid="footer-logo-link">
            <img
              src={logo}
              alt="Brightest logo"
              className="h-20 w-auto"
              data-testid="footer-logo-image"
            />
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3 text-gray-600 font-medium">

          <Link
            to="/login"
            data-testid="footer-login-link"
            className="hover:text-yellow-400 transition"
          >
            Login
          </Link>

          <Link
            to="/about"
            data-testid="footer-about-link"
            className="hover:text-yellow-400 transition"
          >
            About
          </Link>

          <Link
            to="/contact"
            data-testid="footer-contact-link"
            className="hover:text-yellow-400 transition"
          >
            Contact
          </Link>

        </div>

        {/* Socials */}
        <div className="flex justify-end gap-4">

          <div
            data-testid="footer-linkedin"
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:scale-105 transition"
          >
            <FaLinkedinIn className="text-[#F4C709]" />
          </div>

          <div
            data-testid="footer-facebook"
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:scale-105 transition"
          >
            <FaFacebookF className="text-[#F4C709]" />
          </div>

          <div
            data-testid="footer-instagram"
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:scale-105 transition"
          >
            <FaInstagram className="text-[#F4C709]" />
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="md:col-start-2 md:col-end-3 pt-6 pb-10 text-center mt-6 text-sm text-gray-700">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-2">
          <span>General Terms and Conditions</span>
          <span>Privacy and Cookie Policy</span>
          <span>Kmo-portefeuille</span>
          <span>Sustainable Development Goals</span>
        </div>

        <div className="font-medium">
          © {new Date().getFullYear()} Brightest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;