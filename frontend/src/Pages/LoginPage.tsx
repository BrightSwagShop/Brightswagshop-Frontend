import { useMsal, useIsAuthenticated } from "@azure/msal-react";

import { Navigate } from "react-router-dom";
import { loginRequest } from "../Config/AuthConfig";

const LoginPage = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-yellow-500 text-white rounded"
      >
        Login with Microsoft
      </button>
    </div>
  );
};

export default LoginPage;