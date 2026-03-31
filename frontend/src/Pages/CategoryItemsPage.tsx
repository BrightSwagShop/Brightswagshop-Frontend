//import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { addCartItem } from "../API/CartAPI";
import { fetchWithAuth } from "../services/api";

type MaatInfo = {
  maat: string;
  stock: number;
  sku: string;
};

type KleurInfo = {
  kleur: string;
  imageUrl: string;
  maten?: MaatInfo[];
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  productType: string;
  isActive: boolean;
  imageUrl?: string;
  kleuren?: KleurInfo[];
};

const CategoryItemsPage = () => {
  const { category } = useParams<{ category: string }>();
  const [addingProductId, setAddingProductId] = useState<string | null>(null);
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = "user-123";

  const handleAddToCart = async (item: Product) => {
    try {
      setAddingProductId(item.id);

      await addCartItem(userId, {
        productId: item.id,
        selectedColor: item.kleuren?.[0]?.kleur,
        quantity: 1,
      });

      alert(`${item.name} toegevoegd aan je winkelwagen.`);
    } catch (err) {
      console.error(err);
      alert("Toevoegen aan winkelwagen is mislukt.");
    } finally {
      setAddingProductId(null);
    }
  };

  const getProductImage = (product: Product) => {
    if (product.kleuren && product.kleuren.length > 0) {
      return product.kleuren[0].imageUrl;
    }

    if (product.imageUrl) {
      return product.imageUrl;
    }

    return "/placeholder.png";
  };
// werkt nog niet moet de api klient Id van Louis krijgen!!!! en in api.ts steken 
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");
          const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/api/products/type/${category}`
      );

      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.error(err);
      setError("Producten konden niet geladen worden.");
    } finally {
      setLoading(false);
    }

        const response = await axios.get<Product[]>(
          `${import.meta.env.VITE_API_URL}/api/products/type/${category}`,
        );

        setItems(response.data);
      } catch (err) {
        console.error(err);
        setError("Producten konden niet geladen worden.");
      } finally {
        setLoading(false);
      }
    };
       

    if (category) {
      loadProducts();
    }
  }, [category]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900">Laden...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold text-red-600">{error}</h1>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900">
          Geen producten gevonden
        </h1>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-10 bg-white">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-[#F4C709] pl-2 pr-4 py-2 text-sm font-medium text-[#3C3C3B] hover:opacity-90 transition mb-6"
          >
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </span>
            Categorieën
          </Link>

          <h1 className="mb-12 text-3xl font-extrabold text-slate-900 capitalize">
            {category}
          </h1>

          <p className="mb-6 mt-2 text-slate-600">
            Bekijk alle items in deze categorie.
          </p>
        </div>
      </div>

      <div className="w-full bg-[#EDEDED] pt-16 pb-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="bg-slate-50 p-6 flex justify-center">
                  <img
                    src={getProductImage(item)}
                    alt={item.name}
                    className="h-44 w-auto object-contain"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {item.name}
                  </h2>

                  <p className="mt-2 text-sm text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-slate-500">
                      € {item.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={addingProductId === item.id}
                      className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-[#3C3C3B] hover:bg-yellow-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {addingProductId === item.id
                        ? "Adding..."
                        : "Add to cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryItemsPage;
