import TopProduct from "./TopProduct";
import { Link } from "react-router-dom";
type TopProductType = {
  id: string;
  name: string;
  sold: number;
  kleuren?: {
    imageUrl: string;
  }[];
};
type TopProductsListProps = {
  products: TopProductType[];
};
export const TopProductsList = ({ products }: TopProductsListProps) => {
  const maxSold = Math.max(...products.map(p => p.sold));

  return (
    <div className="bg-white p-6 rounded-2xl">

      <h2 className="text-2xl font-semibold mb-4">
        Top producten
      </h2>

      {/* headers */}
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>Product</span>
        <span className="w-40 text-right">Verkocht</span>
      </div>

      {/* list */}
      {products.map(p => (
        <TopProduct key={p.id} product={p} maxSold={maxSold} />
      ))}

      <div className="mt-6">
            <Link
                to="/admin/products"
                className="w-full border rounded-xl py-3 flex items-center justify-between px-4"
            >
                Alle producten weergeven
                →
            </Link>
        </div>

    </div>
  );
};