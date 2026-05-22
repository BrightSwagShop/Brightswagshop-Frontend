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
      if (favorites.includes(productId)) {
        const updatedUser = await removeFavorite(productId);
        setFavorites(updatedUser.favorites ?? []);
      } else {
        const updatedUser = await addFavorite(productId);
        setFavorites(updatedUser.favorites ?? []);
      }
      await refreshFavorites();
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
