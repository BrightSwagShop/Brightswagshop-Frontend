import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { Navigate } from "react-router-dom";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from "../Config/AuthConfig";
import Login from "../components/Login";
import Loading from "../components/Loading";

const LoginPage = () => {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  // terwijl MSAL bezig is (redirect/login)
  if (inProgress !== InteractionStatus.None) {
    return <Loading />;
  }

  // al ingelogd
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Login handleLogin={handleLogin} />;
};

export default LoginPage;