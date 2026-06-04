import { useEffect, useState } from "react";
import { useFavorites } from "../hooks/useFavorites";
import api from "../API/api";
import { getBugStatuses } from "../services/bugService";
import ErrorComponent from "../components/ErrorComponent";
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
  const [isBrokenFavorites, setIsBrokenFavorites] = useState(false);

  useEffect(() => {
    const loadFavoriteProducts = async () => {
      try {
        const bugSettings = await getBugStatuses();

        if (bugSettings.brokenFavorites) {
          setIsBrokenFavorites(true);
          setProducts([]);
          setIsLoading(false);
          return;
        }

        setIsBrokenFavorites(false);

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

  if (isBrokenFavorites) {
    return (
      <ErrorComponent
        title="Favorieten tijdelijk niet beschikbaar"
        description="We kunnen je favorieten momenteel niet laden. Probeer het zo meteen opnieuw."
      />
    );
  }

  if (favorites.length === 0 || products.length === 0) {
    return (
      <ErrorComponent
        title={
          favorites.length === 0
            ? "Nog geen favorieten"
            : "Favorieten niet gevonden"
        }
        description={
          favorites.length === 0
            ? "Je hebt nog geen producten aan je favorieten toegevoegd. Klik op het hartje bij een product om hier iets te tonen."
            : "We konden de producten in je favorieten niet ophalen. Controleer of de producten nog bestaan en probeer het opnieuw."
        }
      />
    );
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
