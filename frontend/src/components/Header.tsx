import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../assets/Brightest-logo's/logo.png";
import { useState, useEffect } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";


const Header = () => {
  
  const [isScrolled, setIsScrolled] = useState(false);
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  //voor login standaard gebruiker
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = isAuthenticated || user;

  const logout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };

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
          {isAuthenticated && (
            <Link
              to="/admin/dashboard"
              data-testid="dashboard-link"
              className="flex items-center gap-2 hover:text-yellow-500 transition font-ttnorms font-bold"
            >
              Dashboard
            </Link>
          )}

          {/* {!isAuthenticated ? (
            <Link
              to="/login"
              data-testid="login-link"
              className="flex items-center gap-2 hover:text-yellow-500 transition font-ttnorms font-bold"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="hover:text-yellow-500 transition font-ttnorms font-bold"
            >
              Logout
            </button>
          )} */}

                    {!isLoggedIn ? (
            <Link
              to="/login"
              className="flex items-center gap-2 hover:text-yellow-500 transition font-ttnorms font-bold"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                if (user) {
                  //  standaard login logout
                  localStorage.removeItem("user");
                  window.location.href = "/";
                } else {
                  //  Microsoft logout
                  logout();
                }
              }}
              className="hover:text-yellow-500 transition font-ttnorms font-bold"
            >
              Logout
            </button>
          )}

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