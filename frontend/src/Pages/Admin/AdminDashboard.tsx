import { Link } from "react-router-dom";
import { FaUsers, FaBoxOpen, FaBug, FaCog, FaArrowRight } from "react-icons/fa";
//import apiClient from "../../services/axiosInstance";
import { FaSync } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import {
  FiShoppingBag,
  FiList,
  FiDollarSign,
  FiBookmark,
} from "react-icons/fi";
import { TopProductsList } from "../../components/TopProductsList";

interface SnelleActiesCard {
  title: string;
  subtitle: string;
  to: string;
  icon: React.ReactNode;
}

interface DashboardCard {
  title: string;
  total: number;
  description: string;
  icon: React.ReactNode;
  type: string;
}

//hardcoded ProductsLijst momenteel
const products = [
  { id: "1", name: "T-shirt", sold: 90, kleuren: [] },
  { id: "2", name: "Hoodie", sold: 45, kleuren: [] },
];

const cards1: DashboardCard[] = [
  {
    title: "Bestellingen",
    total: 128,
    description: "12% vs gisteren",
    type: "number",
    icon: <FiShoppingBag size={24} />,
  },
  {
    title: "Openstaande bestellingen",
    total: 34,
    description: "8% vs gisteren",
    type: "number",
    icon: <FiList size={24} />,
  },
  {
    title: "Omzet",
    total: 12000.0,
    type: "currency",
    description: "2% vs gisteren",
    icon: <FiDollarSign size={24} />,
  },
];
const cards: SnelleActiesCard[] = [
  {
    title: "Productbeheer",
    subtitle: "product toevoegen",
    to: "/admin/products",
    icon: <FaBoxOpen />,
  },
  {
    title: "Gebruikersbeheer",
    subtitle: "Admin toevoegen",
    to: "/admin/users",
    icon: <FaUsers />,
  },
  {
    title: "Promoties",
    subtitle: "Kortingscode toevoegen",
    to: "/admin/kortingcode",
    icon: <FiBookmark />,
  },
  {
    title: "Bugs",
    subtitle: "Toggle test bugs",
    to: "/admin/bugs",
    icon: <FaBug />,
  },
  {
    title: "Settings",
    subtitle: "Admin settings",
    to: "/admin/settings",
    icon: <FaCog />,
  },
  {
    title: "Test reports",
    subtitle: "Run API, frontend and E2E tests",
    to: "/admin/test-automation",
    icon: <FaArrowRight />,
  },
];

const adminName = "Admin"; // later uit auth/context

const AdminDashboard = () => {
  // const handleTest = async () => {
  //   try {
  //     const response = await apiClient.get("/api/admins/admin-only");
  //     console.log(response.data);
  //     alert(response.data);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Call failed");
  //   }
  // };

  // const handleDebugClaims = async () => {
  //   try {
  //     const response = await apiClient.get("/api/debug/claims");
  //     console.log("Claims:", response.data);
  //   } catch (err) {
  //     console.error("Claims error:", err);
  //   }
  // };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">SwagShop</h1>
        <p className="text-sm text-gray-500">{adminName} Dashboard</p>
      </div>

      <div className="bg-[#EDE4C8] border-2  border-[#F4c709] rounded-2xl p-6 flex items-center justify-between">
        <div className=" inline-flex items-center gap-6  ">
          <FaExclamationTriangle className="text-yellow-500 text-3xl" />

          <div className=" inline-block items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-1000 mb-2">
              Fout bij het laden van gegevens
            </h2>
            <p className="text-sm text-[#3C3C3B]">
              Sommige gegevens konden niet worden geladen. Probeer het later
              opnieuw.
            </p>
          </div>
        </div>

        <div className="mt-5">
          {/* Right side reserved for actions (retry button below) */}
        </div>
        <Link
          to="/admin/dashboard"
          className=" inline-flex items-center bg-white gap-2 border border-[#090804] text-black px-4 py-2 rounded-xl font-semibold hover:bg-yellow-500 transition"
        >
          <FaSync className="text-black" />
          Opnieuw proberen
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards1.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl p-6 hover:shadow-md transition group"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#fef4d5] flex items-center justify-center text-[#F4c709] text-2xl">
                {card.icon}
              </div>

              <div className="text-center font-semibold text-gray-900">
                {card.title}
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="mt-4 text-3xl font-semibold text-gray-900">
                {card.type === "currency"
                  ? new Intl.NumberFormat("nl-BE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(card.total)
                  : card.total}
              </div>

              {/* Trend */}
              <div className="mt-1 text-sm text-green-500">
                ↑ {card.description} <span className="text-gray-500"></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <TopProductsList products={products} />
        </div>

        <div className="bg-white flex-1  p-6 rounded-2xl">
          <h2 className="text-3xl mb-6">Snelle acties</h2>

          <div className="flex flex-col gap-4">
            {cards.map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className=" bg-white border rounded-2xl  px-4 py-3 hover:shadow-md transition group"
              >
                <div className="flex items-center justify-between">
                  {/* LINKS */}
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-[#fef4d5] flex items-center justify-center text-[#F4c709] text-lg">
                      {card.icon}
                    </div>

                    <div className="">
                      <div className="text-lg font-semibold text-gray-900">
                        {card.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {card.subtitle}
                      </div>
                    </div>
                  </div>
                  <FaArrowRight className="text-gray-300 group-hover:text-yellow-500 transition" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* <button onClick={handleTest}>Test admin endpoint</button>
        <button onClick={handleDebugClaims}>Debug claims</button> */}
    </div>
  );
};

export default AdminDashboard;
