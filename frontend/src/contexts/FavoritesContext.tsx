import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AtuhContext";

type Product = {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
};
type Favorite = {
  id: string;
  productId: string;
  createdAt: string;
};

type FavoritesContextType = {
  favorites: string[]; // store ONLY productIds
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
};

export const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({
  children,
  
}: {
  children: React.ReactNode;
  
}) => {
    const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);

  //  FETCH
  //haal data van API en update je favorites state
  const fetchFavorites = async () => {
    try {
      const res = await axios.get<Favorite[]>("/favorites");
      setFavorites(res.data.map((f) => f.productId));
    } catch (err) {
      console.error("Fetch favorites failed", err);
    }
  };


  // 🔹 voeg favorite toe aan backend
  const addFavorite = async (productId: string) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    const token = localStorage.getItem("token");
    try {
      console.log("SENDING:", {
      url: "http://localhost:5076/api/favorites",
      body: { productId },
       
         headers: {
          Authorization: `Bearer ${token}`,
       
      },
    });// hier ontbreekt mijn authorization header volledig
    if (!token) {
        console.log("NO TOKEN → login flow is kapot");
        return;
      }
      await axios.post("http://localhost:5076/api/favorites", { 
         userId: user.id,
        productId 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
      console.log(user);
      console.log("TOKEN:", localStorage.getItem("token"));
      console.log("TOKEN:", token);
      setFavorites((prev) => [...prev, productId]);
    } catch (err: any) {
      console.error("Add favorite failed", err);
       console.log("ERROR STATUS:", err.response?.status);
    console.log("ERROR DATA:", err.response?.data);
     
    }
  };

  // 🔹 REMOVE
  const removeFavorite = async (productId: string) => {
    try {
      await axios.delete("/favorites", {
        data: { productId },
      });
      setFavorites((prev) => prev.filter((id) => id !== productId));
    } catch (err) {
      console.error("Remove favorite failed", err);
    }
  };

  // 🔹 TOGGLE
  const toggleFavorite = (productId: string) => {
    if (!isAuthenticated) {
      console.log("User not logged in");
      return;
    }

    if (favorites.includes(productId)) {
      removeFavorite(productId);
    } else {
      addFavorite(productId);
    }
  };

  // 🔹 CHECK
  const isFavorite = (productId: string) => {
    return favorites.includes(productId);
  };

  // 🔹 AUTO FETCH ON LOGIN
  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};