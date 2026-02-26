import { FaRegHeart } from "react-icons/fa";
import {FiShoppingCart} from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../assets/Brightest-logo's/logo.png";
 

const Header = () => {

   // const isLoggedIn = false; // later from auth of context fixen.


  return (
    <header className="w-full bg-white border-b border-yellow-400">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Left: Logo + Brand */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Brightest logo" className="h-13 w-auto" />
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/login" className="flex items-center gap-2 hover:text-yellow-500 transition font-ttnorms font-bold">
            Logout
          </Link>
          <Link to="/about" className="flex items-center gap-2 hover:text-yellow-500 transition  font-ttnorms font-bold">
            About 
          </Link>

          <Link to="/contact" className="hover:text-yellow-500 transition font-ttnorms font-bold">
            Contact
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-6 text-gray-700 font-medium">

                      <Link to="/favoriten" className="flex items-center gap-4 hover:text-yellow-500 transition">
                            <FaRegHeart className="text-lg cursor-pointer" />
                        </Link>
                        
                        <Link to="/winkelwagen"  className="flex items-center gap-4 text-gray-800 hover:text-yellow-500 transition">
                            <FiShoppingCart className="text-xl cursor-pointer" />
                        </Link>
        </div>
 
      </div>
    </header>
  );
};

export default Header;
