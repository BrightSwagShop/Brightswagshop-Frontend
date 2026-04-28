import { FiEdit, FiTrash2 } from "react-icons/fi";
 
type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    category: string;
    isActive: boolean;
    imageUrl?: string;
  };
  onDelete: (id: string) => void;
  onToggleStock: (id: string, value: boolean) => void;
};

const AdminProductCard = ({ product, onDelete, onToggleStock }: Props) => {
  return (
    <div className="grid grid-cols-5 items-center px-6 py-4 border-t">

      {/* IMAGE + NAME */}
      <div className="flex items-center gap-3">
        <img
          src={product.imageUrl || "/placeholder.png"}
          className="w-12 h-12 rounded-md object-cover"
        />
        <span>{product.name}</span>
      </div>

      <span>{product.category}</span>
      <span>€ {product.price}</span>

      {/* STOCK TOGGLE */}
      <div>
        <button
          onClick={() => onToggleStock(product.id, !product.isActive)}
          className={`px-3 py-1 rounded ${
            product.isActive
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {product.isActive ? "Actief" : "Niet actief"}
        </button>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 text-gray-500">
        <FiEdit className="cursor-pointer hover:text-black" />
        <FiTrash2
          onClick={() => onDelete(product.id)}
          className="cursor-pointer hover:text-red-500"
        />
      </div>

    </div>
  );
};

export default AdminProductCard;