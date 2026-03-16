import { useEffect } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../Config/AuthConfig";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        instance.loginRedirect(loginRequest);
      }, 1000); // 1 seconde wachten

      return () => clearTimeout(timer);
    }
  }, [instance, isAuthenticated]);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <div>Redirecting to Microsoft...</div>;
};

export default LoginPage;