import { Link } from "react-router-dom";
import { FaUsers, FaBoxOpen, FaBug, FaCog, FaArrowRight } from "react-icons/fa";
 
interface DashboardCard {
  title: string;
  subtitle: string;
  to: string;
  icon: React.ReactNode;
}

const cards: DashboardCard[] = [
  { title: "Users", subtitle: "Manage users", to: "/admin/users", icon: <FaUsers /> },
  { title: "Products", subtitle: "Manage products", to: "/admin/products", icon: <FaBoxOpen /> },
  { title: "Bugs", subtitle: "Toggle test bugs", to: "/admin/bugs", icon: <FaBug /> },
  { title: "Settings", subtitle: "Admin settings", to: "/admin/settings", icon: <FaCog /> },
];

const adminName = "Admin"; // later uit auth/context

const AdminDashboard = () => {

  
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">
                Welkom {adminName}
            </h1>
            <p className="text-sm text-gray-500">
                Beheer hier users, producten, bugs en instellingen
            </p>
        </div>


      <div className="bg-white border rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Admin Dashboard</h2>
          <p className="text-sm text-gray-500">Quick access to admin features</p>
        </div>

        <Link
          to="/"
          className="bg-yellow-400 text-white px-4 py-2 rounded-xl font-semibold hover:bg-yellow-500 transition"
        >
          Back to shop
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="bg-white border rounded-2xl p-6 hover:shadow-md transition group"
          >
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-800 text-lg">
                {card.icon}
              </div>
              <FaArrowRight className="text-gray-300 group-hover:text-yellow-500 transition" />
            </div>

            <div className="mt-5">
              <div className="text-sm text-gray-500">{card.subtitle}</div>
              <div className="text-lg font-semibold text-gray-900">{card.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
