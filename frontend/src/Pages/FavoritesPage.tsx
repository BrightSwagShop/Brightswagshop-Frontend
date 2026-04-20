import { useEffect, useState } from "react";
import { useFavorites } from "../hooks/useFavorites";
import api from "../api/api";
import ProductCard from "../components/ProductCard";

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  kleuren?: {
    imageUrl: string;
  }[];
};

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavoriteProducts = async () => {
      try {
        if (favorites.length === 0) {
          setProducts([]);
          setIsLoading(false);
          return;
        }

        setIsLoading(true);

        const response = await api.post<Product[]>(
          "/api/products/by-ids",
          favorites,
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Fout bij ophalen van favorieten:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavoriteProducts();
  }, [favorites]);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (favorites.length === 0) {
    return <div className="p-6">No favorites yet</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
