import CartItem from "./CartItem";
import type { CartItemResponse } from "../../API/CartAPI";

type ShoppingCartProps = {
  items: CartItemResponse[];
  onQuantityChange: (
    productId: string,
    selectedColor: string | undefined,
    quantity: number,
  ) => void;
  onRemove: (productId: string, selectedColor: string | undefined) => void;
  isUpdating?: boolean;
};

const ShoppingCart = ({
  items,
  onQuantityChange,
  onRemove,
  isUpdating = false,
}: ShoppingCartProps) => {
  if (items.length === 0) {
    return <p>Je winkelwagen is leeg.</p>;
  }

  return (
    <div className="space-y-8">
      {items.map((item) => (
        <CartItem
          key={`${item.productId}-${item.selectedColor ?? "default"}`}
          item={item}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
          isUpdating={isUpdating}
        />
      ))}
    </div>
  );
};

export default ShoppingCart;
