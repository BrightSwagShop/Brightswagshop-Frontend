import { createContext, useContext } from "react";
import { msalInstance } from "../Config/AuthConfig";

const AuthContext = createContext<{ isAuthenticated: boolean }>({
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // MSAL check
  const accounts = msalInstance.getAllAccounts();
  const isMsalLoggedIn = accounts.length > 0;

  // Mongo check
  const token = localStorage.getItem("token");
  const isMongoLoggedIn = !!token;

  //  combine
  const isAuthenticated = isMsalLoggedIn || isMongoLoggedIn;
   console.log("isAuthenticated " +isAuthenticated);

  console.log(localStorage.getItem("token"));
  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);