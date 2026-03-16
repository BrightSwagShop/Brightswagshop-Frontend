import { useIsAuthenticated } from "@azure/msal-react";
import { Navigate } from "react-router-dom";
// omdat de project verbatimModuleSyntax gebruikt, moet types apart geïmporteerd worden.
import type { ReactNode } from "react";

// children wat je tussen je components plaatst

type ProtectedRouteProps = {
  children: ReactNode;
};
// logica 
// niet ingelogd ga naar /login
// wel ingelogd -> toon children
{/* <ProtectedRoute>
  <AdminLayout />
</ProtectedRoute> */}
// <AdminLayout /> is hier de children



const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;