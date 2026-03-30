import { FaRegTrashAlt } from "react-icons/fa";
import type { CartItemResponse } from "../../API/CartAPI";

type CartItemProps = {
  item: CartItemResponse;
  onQuantityChange: (
    productId: string,
    selectedColor: string | undefined,
    quantity: number,
  ) => void;
  onRemove: (productId: string, selectedColor: string | undefined) => void;
  isUpdating?: boolean;
};

const CartItem = ({
  item,
  onQuantityChange,
  onRemove,
  isUpdating = false,
}: CartItemProps) => {
  const itemTotal = item.unitPrice * item.quantity;
  const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between bg-white border rounded-md shadow-xl p-6">
      <div className="flex items-center gap-6 min-w-0">
        <img
          src={item.imageUrl}
          alt={item.productName}
          className="w-16 h-16 rounded bg-gray-100 object-cover shrink-0"
        />

        <div className="min-w-0">
          <p className="text-yellow-500 font-semibold">{item.productName}</p>

          {item.selectedColor && (
            <p className="text-gray-500 text-xs mt-1">
              Kleur: {item.selectedColor}
            </p>
          )}

          <p className="text-gray-500 text-xs mt-2 break-all">
            Product ID: {item.productId}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <select
          value={item.quantity}
          onChange={(e) =>
            onQuantityChange(
              item.productId,
              item.selectedColor,
              Number(e.target.value),
            )
          }
          disabled={isUpdating}
          className="border border-yellow-500 rounded px-2 py-1 text-sm"
        >
          {quantityOptions.map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => onRemove(item.productId, item.selectedColor)}
          disabled={isUpdating}
          className="text-gray-500 text-lg hover:text-yellow-500 transition-colors duration-200"
        >
          <FaRegTrashAlt />
        </button>

        <p className="font-semibold min-w-[80px] text-right">
          €{itemTotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
