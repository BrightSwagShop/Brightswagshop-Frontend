import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useAuth } from "../hooks/useAuth";
import { FiLogOut } from "react-icons/fi";

const AdminHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { instance } = useMsal();
  const isMsalAuthenticated = useIsAuthenticated();
  const { user, isAuthenticated, logout } = useAuth();

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
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 w-full bg-black text-white z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div
        className={`px-6 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "h-14" : "h-16"
        }`}
      >
        {/* LEFT */}
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 font-semibold"
        >
          <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center">
            <span className="text-black font-bold">B</span>
          </div>

          <span className="text-lg">Admin Dashboard</span>
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          {user && (
            <span className="bg-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              {user.username?.slice(0, 2).toUpperCase()}
            </span>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:text-yellow-400 transition"
            >
              <FiLogOut />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;