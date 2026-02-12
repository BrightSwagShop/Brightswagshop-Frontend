import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminComponents/AdminSidebar";
import AdminBreadcrumbs from "../components/AdminComponents/AdminBeadcrumbs";


const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen flex bg-gray-50">
      <AdminSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
      />

      <main className="flex-1 p-8 overflow-y-auto relative">
        <AdminBreadcrumbs />
        

        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
