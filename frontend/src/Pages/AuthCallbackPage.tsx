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

    if (isAdmin) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/unauthorized", { replace: true });
    }
  }, [isAuthenticated, accounts, navigate]);

  return <Loading />;
};

export default AuthCallbackPage;
