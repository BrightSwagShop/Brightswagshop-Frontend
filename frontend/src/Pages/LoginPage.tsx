import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { Navigate } from "react-router-dom";
import { loginRequest } from "../Config/AuthConfig";
import Login from "../components/Login";
import Loading from "../components/Loading";

const LoginPage = () => {
const { instance, accounts, inProgress } = useMsal();
const isAdminAuthenticated = useIsAuthenticated();

  const handleAdminLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  if (inProgress !== InteractionStatus.None) {
    return <Loading />;
  }

if (isAdminAuthenticated && accounts.length > 0) {
  const claims = accounts[0].idTokenClaims as Record<string, unknown>;
  const roles = (claims?.roles as string[]) ?? [];
  const isAdmin = roles.includes("App.Admin");

  if (isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/unauthorized" replace />;

  }

  return <Login handleLogin={handleAdminLogin} />;
};

export default LoginPage;
