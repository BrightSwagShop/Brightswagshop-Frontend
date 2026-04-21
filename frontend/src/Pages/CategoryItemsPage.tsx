import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductsByType } from "../services/productService";
import type { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";

const CategoryItemsPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      if (!category) return;

      try {
        setIsLoading(true);
        setError("");

        const data = await getProductsByType(category);
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Producten konden niet geladen worden.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  if (isLoading) {
    return <div className="p-10">Loading...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-500">{error}</div>;
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
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryItemsPage;
