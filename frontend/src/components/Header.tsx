import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Brightest-logo's/logo.png";
import { useState, useEffect, type CSSProperties } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { instance } = useMsal();
  const isMsalAuthenticated = useIsAuthenticated();
  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const isLoggedIn = isMsalAuthenticated || isAuthenticated;

  const handleLogout = () => {
    if (isMsalAuthenticated) {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
      return;
    }

    logout();
    window.location.href = "/";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const innerHeaderStyle: CSSProperties = {
    contain: "layout size",
  };

  return (
    <header className="sticky top-0 z-50 w-full h-25 pointer-events-none">
      <div
        style={innerHeaderStyle}
        className={`pointer-events-auto absolute inset-x-0 top-0 bg-white transition-all duration-300 ${
          isScrolled ? "h-14 shadow-md" : "h-25"
        }`}
      >
        <div className="max-w-7xl mx-auto px-16 flex items-center justify-between h-full">
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

          <nav className="hidden lg:flex items-center gap-8 text-[#3C3C3B] font-medium">
            <Link
              to="/"
              className="flex items-center gap-2 hover:text-yellow-500 transition font-ttnorms font-bold"
            >
              Home
            </Link>

            {isMsalAuthenticated && (
              <Link
                to="/admin/dashboard"
                data-testid="dashboard-link"
                className="flex items-center gap-2 hover:text-yellow-500 transition font-ttnorms font-bold"
              >
                Dashboard
              </Link>
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

            <div className=" flex justify-end">
              {!isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    try {
                      sessionStorage.setItem(
                        "preLoginPath",
                        window.location.pathname || "/",
                      );
                    } catch {
                      // ignore
                    }
                    navigate("/login");
                  }}
                  className="hover:text-yellow-500 transition font-ttnorms font-bold"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="hover:text-yellow-500 transition font-ttnorms font-bold"
                >
                  Logout
                </button>
              )}
            </div>
          </nav>

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

            <div className="flex items-center gap-3">
              <Link
                to="/winkelwagen"
                data-testid="cart-link"
                className="text-gray-800 hover:text-yellow-500 transition"
              >
                <FiShoppingCart
                  className="text-xl cursor-pointer"
                  data-testid="cart-icon"
                />
              </Link>

              {user && (
                <span className="text-sm font-bold text-yellow-500 cursor-default capitalize">
                  {user.username}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
