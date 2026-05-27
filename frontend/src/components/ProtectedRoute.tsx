import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useIsAuthenticated();
  const { accounts } = useMsal();

  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
  console.log("ProtectedRoute - accounts:", accounts);
  console.log("ProtectedRoute - claims:", accounts[0]?.idTokenClaims);

  if (!isAuthenticated || accounts.length === 0) {
    console.log("❌ Not authenticated → redirect to /");
    return <Navigate to="/" replace />;
  }

  const claims = accounts[0].idTokenClaims as Record<string, unknown>;
  const roles = (claims?.roles as string[]) ?? [];

  console.log("ProtectedRoute - roles:", roles);

  const isAdmin = roles.includes("App.Admin");

  console.log("ProtectedRoute - isAdmin:", isAdmin);

  if (!isAdmin) {
    console.log("❌ Not admin → redirect to /unauthorized");
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("✅ Admin access granted");

  return <>{children}</>;
};

export default ProtectedRoute;
