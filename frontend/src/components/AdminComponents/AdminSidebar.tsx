import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaCog,
  FaChevronLeft, 
  FaChevronRight
} from "react-icons/fa";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const AdminSidebar = ({ collapsed, onToggle }: AdminSidebarProps) => {
  const linkBase =
    "flex items-center gap-3 rounded-lg transition text-sm font-medium";
  const linkInactive =
    "text-gray-300 hover:bg-white/10 hover:text-white";
  const linkActive = "bg-white/15 text-white";

  return (
    <aside
      className={`bg-[#141A3A] text-white py-6 h-screen overflow-y-auto transition-all duration-300 ${
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
            <div className="h-9 w-9 rounded-xl bg-yellow-400 shrink-0" />
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
          <FaTachometerAlt />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `${linkBase} ${collapsed ? "justify-center px-0 py-3" : "px-4 py-2"} ${
              isActive ? linkActive : linkInactive
            }`
          }
        >
          <FaUsers />
          {!collapsed && <span>Users</span>}
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `${linkBase} ${collapsed ? "justify-center px-0 py-3" : "px-4 py-2"} ${
              isActive ? linkActive : linkInactive
            }`
          }
        >
          <FaBoxOpen />
          {!collapsed && <span>Products</span>}
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

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `${linkBase} ${collapsed ? "justify-center px-0 py-3" : "px-4 py-2"} ${
              isActive ? linkActive : linkInactive
            }`
          }
        >
          <FaCog />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
