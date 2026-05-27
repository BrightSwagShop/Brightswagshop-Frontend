import { useEffect } from "react";
// InteractionStatus removed; no automatic redirects from App
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";

const App = () => {
  const isAuthenticated = useIsAuthenticated();
  const { accounts, inProgress } = useMsal();
  const navigate = useNavigate();

  useEffect(() => {
    // Previously this effect auto-redirected authenticated users to admin routes.
    // That caused unwanted navigation back to `/admin/dashboard` when visiting `/`.
    // Post-login navigation is now handled by `AuthCallbackPage` using
    // `sessionStorage.preLoginPath` saved by the Header. Keep App passive.
  }, [accounts, inProgress, isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <HomePage />
    </div>
  );
};

export default App;
