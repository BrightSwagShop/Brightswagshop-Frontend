import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";

type CartItem = {
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
};

type ShoppingCart = {
  id: string;
  userId: string;
  sessionId: string;
  items: CartItem[];
  updatedAt: string;
  totalPrice: number;
};

const WinkelwagenPage = () => {
  const [cart, setCart] = useState<ShoppingCart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = "user-123"; // UserId dynamisch toevoegen

  const loadCart = async () => {
    try {
      const response = await axios.get<ShoppingCart>(
        `${import.meta.env.VITE_API_URL}/api/shoppingcarts/user/${userId}`,
      );

      setCart(response.data);
    } catch (err) {
      console.error(err);
      setError("Winkelwagen kon niet geladen worden.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const calculateTotal = () => {
    if (!cart) return 0;

    return cart.items.reduce((total, item) => {
      return total + item.unitPrice * item.quantity;
    }, 0);
  };

  if (loading) {
    return <div className="pt-20 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="pt-20 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto pt-20 pb-20">
        <div className="space-y-8">
          {cart?.items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between bg-white border rounded-md shadow-xl p-6"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gray-100 rounded" />

                <div>
                  <p className="text-yellow-500 font-semibold">
                    {item.productName}
                  </p>

                  <p className="text-gray-500 text-xs mt-2">
                    Product ID: {item.productId}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={item.quantity}
                  className="border border-yellow-500 rounded px-2 py-1 text-sm"
                  disabled
                >
                  <option>{item.quantity}</option>
                </select>

                <button className="text-gray-500 text-lg cursor-pointer hover:text-yellow-500 transition-colors duration-200">
                  <FaRegTrashAlt />
                </button>

                <p className="font-semibold">
                  €{(item.unitPrice * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-10">
          <div className="text-right">
            <p className="text-sm text-gray-600">Totaal bedrag:</p>
            <p className="font-semibold text-lg">
              €{calculateTotal().toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-12">
          <Link to="/">
            <button className="border border-yellow-500 text-yellow-500 px-6 py-2 rounded-md hover:scale-105 transition cursor-pointer">
              Verder winkelen
            </button>
          </Link>

          <Link to="/checkout">
            <button className="bg-yellow-500 text-[#3C3C3B] px-10 py-2 rounded-md hover:bg-yellow-400 hover:scale-105 transition cursor-pointer">
              Afrekenen
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WinkelwagenPage;
