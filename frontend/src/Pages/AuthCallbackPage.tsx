import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const AuthCallbackPage = () => {
  const { accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Callback - isAuthenticated:", isAuthenticated);
    console.log("Callback - accounts:", accounts);
    console.log("Callback - claims:", accounts[0]?.idTokenClaims);

    if (!isAuthenticated || accounts.length === 0) return;

    const claims = accounts[0].idTokenClaims as Record<string, unknown>;
    const roles = (claims["roles"] as string[]) ?? [];

    console.log("Callback - roles:", roles);

    const isAdmin = roles.includes("App.Admin");

    // Respect where the user started the login flow. Header saves the path in sessionStorage.
    const preLogin = (() => {
      try {
        return sessionStorage.getItem("preLoginPath") || "/";
      } catch {
        return "/";
      }
    })();

    try {
      sessionStorage.removeItem("preLoginPath");
    } catch {
      void 0; // ignore errors when clearing sessionStorage
    }

    if (preLogin.startsWith("/admin")) {
      if (isAdmin) {
        navigate(preLogin, { replace: true });
      } else {
        navigate("/unauthorized", { replace: true });
      }
    } else {
      // For non-admin or general logins, go back to the originating page (or home).
      navigate(preLogin || "/", { replace: true });
    }
  }, [isAuthenticated, accounts, navigate]);

  return <Loading />;
};

export default AuthCallbackPage;
