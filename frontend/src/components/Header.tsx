import logo from "../assets/Brightest-logo's/P_BRI_BRIGHTEST-2022_LOGOTYPE-MAIN-POS_RGB-01.png";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

const Header = () => {

    const isLoggedIn = false; // later from auth of context fixen.


  return (
    <header className="w-full bg-white border-b border-yellow-400">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Left: Logo + Brand */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Brightest logo" className="h-15 w-auto" />
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="flex items-center gap-2 hover:text-yellow-500 transition font-ttnorms font-bold">
            Home 
          </Link>

          <Link to="/cases" className="hover:text-yellow-500 transition font-ttnorms font-bold">
            Placeholder
          </Link>

          <Link to="/about" className="flex items-center gap-2 hover:text-yellow-500 transition font-ttnorms font-bold">
            About 
          </Link>

          <Link to="/contact" className="hover:text-yellow-500 transition font-ttnorms font-bold">
            Contact
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center gap-6 text-gray-700 font-medium">
            
            <Link to="/favoriten" className="flex items-center gap-4 hover:text-yellow-500 transition">
                <FaHeart className="text-lg cursor-pointer" />
            </Link>
            
            <Link to="/winkelwagen" className="flex items-center gap-4 hover:text-yellow-500 transition">
                <FaShoppingCart className="text-lg cursor-pointer" />
            </Link>
            
            {/* Todo: Als user ingelogd is, profiel naam toevoegen. (Zie bol.com) */}
            <Dropdown
            label="Dashboard"
            items={[
                { label: "Overview", to: "/dashboard/overview" },
                { label: "Profile", to: "/dashboard/profile" },
                { label: "Settings", to: "/dashboard/settings" },
                { label: "Logout", to: "/logout"}
            ]}
            />
            
        </div>
      </div>
    </header>
  );
};

export default Header;
