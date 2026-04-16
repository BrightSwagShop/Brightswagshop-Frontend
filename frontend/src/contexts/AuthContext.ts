import { createContext } from "react";

export type AuthUser = {
  id: string;
  username: string;
  favorites?: string[];
  
};

export type AuthContextType = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
  setAuthUser: (user: AuthUser | null) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  setAuthUser: () => {},
  logout: () => {},
});
