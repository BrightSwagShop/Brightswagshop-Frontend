import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { useAuth } from "../hooks/useAuth";
import { addFavorite, removeFavorite, getMe } from "../services/userService";

type FavoritesProviderProps = {
  children: ReactNode;
};

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);

  const refreshFavorites = async () => {
    try {
      const user = await getMe();
      setFavorites(user.favorites ?? []);
    } catch (error) {
      console.error("Fetch favorites failed:", error);
      setFavorites([]);
    }
  };

  const toggleFavorite = async (productId: string) => {
    try {
      let updatedUser;

      if (favorites.includes(productId)) {
        updatedUser = await removeFavorite(productId);
      } else {
        updatedUser = await addFavorite(productId);
      }

      setFavorites(updatedUser.favorites ?? []);
    } catch (error) {
      console.error("Toggle favorite failed:", error);
    }
  };

  const isFavorite = (productId: string) => {
    return favorites.includes(productId);
  };

  useEffect(() => {
    let cancelled = false;

    const loadFavorites = async () => {
      if (isLoading) return;

      if (!isAuthenticated) {
        if (!cancelled) {
          setFavorites([]);
        }
        return;
      }

      try {
        const user = await getMe();

        if (!cancelled) {
          setFavorites(user.favorites ?? []);
        }
      } catch (error) {
        console.error("Fetch favorites failed:", error);

        if (!cancelled) {
          setFavorites([]);
        }
      }
    };

    loadFavorites();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, isLoading]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, refreshFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
