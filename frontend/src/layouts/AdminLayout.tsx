import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminComponents/AdminSidebar";
import AdminBreadcrumbs from "../components/AdminComponents/AdminBeadcrumbs";
import AdminHeader from "../components/AdminHeader";
 


const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (<>
     <AdminHeader />
    <div className="h-screen flex bg-[#EDEDED]">
      <AdminSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        />

      <main className="flex-1 p-8 overflow-y-auto relative">
        
        <AdminBreadcrumbs />
        

        <Outlet />
      </main>
    </div>
        </>
  );
};

export default AdminLayout;
