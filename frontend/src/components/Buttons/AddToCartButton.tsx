import { FaShoppingCart, FaCheck } from "react-icons/fa";
import { useState, useContext } from "react";
import { addCartItem } from "../../api/CartAPI";
import { AuthContext } from "../../contexts/AuthContext";

type AddToCartButtonProps = {
  productId: string;
  productName: string;
  selectedColor?: string;
};

const AddToCartButton = ({
  productId,
  selectedColor,
}: AddToCartButtonProps) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleClick = async () => {
    if (!user?.id) {
      alert("Log eerst in.");
      return;
    }

    try {
      setLoading(true);

      await addCartItem(user.id, {
        productId,
        selectedColor,
        quantity: 1,
      });

      setAdded(true); // 🔥 dit is de key
    } catch (error) {
      console.error(error);
      alert("Toevoegen mislukt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => void handleClick()}
      disabled={loading}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition
        ${
          added
            ? "bg-green-100 text-green-700 border border-green-500"
            : "bg-yellow-400 text-[#3C3C3B] hover:bg-yellow-300"
        }`}
    >
      {loading ? (
        "..."
      ) : added ? (
        <>
          <FaCheck />
          Added
        </>
      ) : (
        <>
          <FaShoppingCart />
          Add to cart
        </>
      )}
    </button>
  );
};

export default AddToCartButton;
