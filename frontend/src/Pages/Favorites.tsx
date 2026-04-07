import { useEffect, useState } from "react";
import axios from "axios";

type Favorite = {
  id: string;
  productId: string;
  createdAt: string;
};

type Product = {
  _id: string;
  name: string;
  price: number;
};

const Favorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const userId = localStorage.getItem("userId"); // of uit auth context

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;

      try {
        //  1. haal favorites op
         
        const res = await axios.get<Favorite[]>(
          `/api/favorites/${userId}`
        );

        setFavorites(res.data);

        // 🔹 2. pak productIds
        const productIds = res.data.map((f) => f.productId);

        if (productIds.length === 0) {
          setProducts([]);
          return;
        }

        // 🔹 3. haal producten op
        const productsRes = await axios.post("/api/products/by-ids", {
          ids: productIds,
        });

        setProducts(productsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFavorites();
  }, [userId]);

  if (!products.length) {
    return <div>No favorites yet</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <div key={item._id}>
            <h2>{item.name}</h2>
            <p>€ {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;