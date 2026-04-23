import { createContext } from "react";

export type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
  refreshFavorites: () => Promise<void>;
};

export const FavoritesContext = createContext<FavoritesContextType | null>(null);