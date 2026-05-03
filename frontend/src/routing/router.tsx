import { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import AdminLayout from "../layouts/AdminLayout";

import App from "../App";
import CategoryItemsPage from "../Pages/CategoryItemsPage";
import DetailPageItem from "../Pages/DetailPageItem";
import Loading from "../components/Loading";

import AdminDashboard from "../Pages/Admin/AdminDashboard";
import Users from "../Pages/Admin/Users";
import Products from "../Pages/Admin/Products";
import Bugs from "../Pages/Admin/Bugs";
import Settings from "../Pages/Admin/Settings";
import CheckoutPage from "../Pages/CheckoutPage";
import About from "../Pages/About";
import AuthCallbackPage from "../Pages/AuthCallbackPage";
import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../components/NotFound";
import Unauthorized from "../components/Unauthorized";
import Favorites from "../Pages/FavoritesPage";
import PaymentSucceed from "../Pages/PaymentSucceed";
import PaymentCanceled from "../Pages/PaymentCanceled";

const LoginPage = lazy(() => import("../Pages/LoginPage"));
const WinkelwagenPage = lazy(() => import("../Pages/WinkelwagenPage"));
const ContactPage = lazy(() => import("../Pages/ContactPage"));

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  { path: "/auth/callback", element: <AuthCallbackPage /> },

  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "category/:category", element: <CategoryItemsPage /> },
      { path: "detailpage", element: <DetailPageItem /> },
      {
        path: "winkelwagen",
        element: (
          <Suspense fallback={<Loading />}>
            <WinkelwagenPage />
          </Suspense>
        ),
      },
      { path: "checkout", element: <CheckoutPage /> },
      {
        path: "contact",
        element: (
          <Suspense fallback={<Loading />}>
            <ContactPage />
          </Suspense>
        ),
      },
      { path: "about", element: <About /> },
      { path: "unauthorized", element: <Unauthorized /> },
      { path: "favoriten", element: <Favorites /> },
      { path: "success", element: <PaymentSucceed /> },
      { path: "cancel", element: <PaymentCanceled /> },
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
          { path: "users", element: <Users /> },
          { path: "products", element: <Products /> },
          { path: "bugs", element: <Bugs /> },
          { path: "settings", element: <Settings /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
