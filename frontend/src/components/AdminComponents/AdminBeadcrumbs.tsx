import { Link, useLocation } from "react-router-dom";

const breadcrumbMap: Record<string, string> = {
  dashboard: "Dashboard",
  users: "Users",
  products: "Products",
  bugs: "Bugs",
  "test-automation": "Test reports",
  settings: "Settings",
};

const AdminBreadcrumbs = () => {
  const { pathname } = useLocation();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((segment) => segment !== "admin");

  return (
    <div className="mb-2">
      <nav className="flex items-center gap-2 text-sm text-gray-400">
        <Link
          to="/"
          reloadDocument
          className="hover:text-yellow-500 transition"
        >
          Home
        </Link>

        {segments.map((segment, index) => {
          const path = "/admin/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;

          return (
            <div key={path} className="flex items-center gap-2">
              <span className="text-gray-300">/</span>
              {isLast ? (
                <span className="text-gray-500 font-medium">
                  {breadcrumbMap[segment] ?? segment}
                </span>
              ) : (
                <Link
                  to={path}
                  className="hover:text-yellow-500 transition capitalize"
                >
                  {breadcrumbMap[segment] ?? segment}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminBreadcrumbs;
