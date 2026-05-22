import { NavLink } from "react-router-dom";

import {
  FaDesktop,
  FaUser,
  FaCube,
  FaClipboardList,
  FaChevronLeft,
  FaChevronRight,
  FaShoppingCart,
} from "react-icons/fa";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}
//onToggele knop om sidebar open/dicht te klappen

//isActive bepaalt styling
const AdminSidebar = ({ collapsed, onToggle }: AdminSidebarProps) => {
  const linkBase =
    "flex items-center gap-3 rounded-lg transition text-sm font-medium";
  const linkInactive = "text-gray-300 hover:bg-white/10 hover:text-white";
  const linkActive = "bg-[#F4C709] text-[#3C3C3B]";

  return (
    <aside
      className={`bg-[#3C3C3B] text-white py-6 h-screen overflow-y-auto transition-all duration-300 ${
        collapsed ? "w-16 px-2" : "w-64 px-4"
      }`}
    >
      {/* Top */}
      <div
        className={`flex items-center mb-8 ${
          collapsed ? "justify-center" : "justify-between px-2"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-yellow-400 shrink-0" />
          {!collapsed && <span className="text-lg font-semibold">Admin</span>}
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="text-gray-300 hover:text-yellow-500 transition"
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Links */}
      <nav className="space-y-2">
        <NavLink
          to="/admin/dashboard"
          end
          className={({ isActive }) =>
            `${linkBase} ${collapsed ? "justify-center px-0 py-3" : "px-4 py-2"} ${
              isActive ? linkActive : linkInactive
            }`
          }
        >
          <FaDesktop />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `${linkBase} ${collapsed ? "justify-center px-0 py-3" : "px-4 py-2"} ${
              isActive ? linkActive : linkInactive
            }`
          }
        >
          <FaCube />
          {!collapsed && <span>Productbeheer</span>}
        </NavLink>

        <NavLink
          to="/admin/bestellingen"
          className={({ isActive }) =>
            `${linkBase} ${collapsed ? "justify-center px-0 py-3" : "px-4 py-2"} ${
              isActive ? linkActive : linkInactive
            }`
          }
        >
          {" "}
          <FaShoppingCart />
          {!collapsed && <span>Bestellingen</span>}
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `${linkBase} ${collapsed ? "justify-center px-0 py-3" : "px-4 py-2"} ${
              isActive ? linkActive : linkInactive
            }`
          }
        >
          <FaUser />
          {!collapsed && <span>Gebruikersbeheer</span>}
        </NavLink>

        <NavLink
          to="/admin/bugs"
          className={({ isActive }) =>
            `${linkBase} ${collapsed ? "justify-center px-0 py-3" : "px-4 py-2"} ${
              isActive ? linkActive : linkInactive
            }`
          }
        >
          <FaClipboardList />
          {!collapsed && <span>Bugs</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
