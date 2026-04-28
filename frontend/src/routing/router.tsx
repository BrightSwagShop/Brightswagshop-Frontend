import { createBrowserRouter, Navigate } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import AdminLayout from "../layouts/AdminLayout";

import App from "../App";
import CategoryItemsPage from "../Pages/CategoryItemsPage";
import DetailPageItem from "../Pages/DetailPageItem";

import AdminDashboard from "../Pages/Admin/AdminDashboard";
import Users from "../Pages/Admin/Users";
import Products from "../Pages/Admin/Products";
import Bugs from "../Pages/Admin/Bugs";
import Settings from "../Pages/Admin/Settings";
import Winkelwagen from "../Pages/WinkelwagenPage";
import CheckoutPage from "../Pages/CheckoutPage";
import ContactPage from "../Pages/ContactPage";
import About from "../Pages/About";
import LoginPage from "../Pages/LoginPage";
import AuthCallbackPage from "../Pages/AuthCallbackPage";
import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../components/NotFound";
import Unauthorized from "../components/Unauthorized";
import Favorites from "../Pages/FavoritesPage";
import PaymentSucceed from "../Pages/PaymentSucceed";
import PaymentCanceled from "../Pages/PaymentCanceled";
import Bestellingen from "../Pages/Admin/Bestellingen";
import GebruikersPagina from "../Pages/Admin/GebruikersPagina";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/auth/callback", element: <AuthCallbackPage /> },

  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "category/:category", element: <CategoryItemsPage /> },
      { path: "detailpage", element: <DetailPageItem /> },
      { path: "winkelwagen", element: <Winkelwagen /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "about", element: <About /> },
      { path: "unauthorized", element: <Unauthorized /> },
      { path: "favoriten", element: <Favorites /> },
      { path: "success", element: <PaymentSucceed /> },
      { path: "cancel", element: <PaymentCanceled /> },],},
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "products", element: <Products /> },
          { path: "users", element: <GebruikersPagina /> },
           { path: "bestellingen", element: <Bestellingen /> },
          { path: "bugs", element: <Bugs /> },
          { path: "settings", element: <Settings /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    
  
]);
