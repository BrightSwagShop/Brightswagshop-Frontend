import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { Navigate } from "react-router-dom";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from "../Config/AuthConfig";
import Login from "../components/Login";
import Loading from "../components/Loading";

const LoginPage = () => {
  const { instance, inProgress } = useMsal();
  const isAdminAuthenticated = useIsAuthenticated();

  const handleAdminLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  // loading MSAL
  if (inProgress !== InteractionStatus.None) {
    return <Loading />;
  }

  // admin ingelogd → dashboard
  if (isAdminAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Login handleLogin={handleAdminLogin} />;
};

export default LoginPage;
