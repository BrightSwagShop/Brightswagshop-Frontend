import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext, type AuthUser } from "../contexts/AuthContext";
import { msalInstance } from "../Config/AuthConfig";
import { getMe } from "../services/userService";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setAuthUser = (newUser: AuthUser | null) => {
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    } else {
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    let cancelled = false;

    const initAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const accounts = msalInstance.getAllAccounts();

        if (token) {
          try {
            const freshUser = await getMe();

            if (!cancelled) {
              setAuthUser({
                id: freshUser.id,
                username: freshUser.username,
                favorites: freshUser.favorites ?? [],
              });
            }
          } catch (error) {
            console.error("GetMe failed:", error);

            if (!cancelled) {
              logout();
            }
          }

          return;
        }

        if (accounts.length > 0 && !cancelled) {
          setAuthUser({
            id: accounts[0]?.localAccountId ?? "",
            username: accounts[0]?.name ?? "Gebruiker",
            favorites: [],
          });
        }
      } catch (error) {
        console.error("Auth init error:", error);

        if (!cancelled) {
          logout();
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    initAuth();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        setAuthUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
