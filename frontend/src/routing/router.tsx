import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import AdminLayout from "../layouts/AdminLayout";

import App from "../App";
import CategoryItemsPage from "../Pages/CategoryItemsPage";
import DetailPageItem from "../Pages/DetailPageItem";
import LoginPage from "../Pages/LoginPage";

import AdminDashboard from "../Pages/Admin/AdminDashboard";
import Users from "../Pages/Admin/Users";
import Products from "../Pages/Admin/Products";
import Bugs from "../Pages/Admin/Bugs";
import Settings from "../Pages/Admin/Settings";
import Winkelwagen from "../Pages/WinkelwagenPage";

export const router = createBrowserRouter([
  // Zonder header/footer
  { path: "/login", element: <LoginPage /> },

  // Met header/footer
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "category/:category", element: <CategoryItemsPage /> },
      { path: "detailpage", element: <DetailPageItem /> },
      { path: "winkelwagen", element: <Winkelwagen />},
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "users", element: <Users /> },
          { path: "products", element: <Products /> },
          { path: "bugs", element: <Bugs /> },
          { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },
]);