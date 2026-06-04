import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCart from "../components/WinkelwagenComponents/ShoppingCart";
import { AuthContext } from "../contexts/AuthContext";
import { createOrderFromCart } from "../API/OrderAPI";
import { createCheckoutSession } from "../API/PaymentAPI";
import {
  getCartByUserId,
  removeCartItem,
  updateCartItemQuantity,
  type ShoppingCartResponse,
} from "../API/CartAPI";

const WinkelwagenPage = () => {
  const { user, isLoading: isAuthLoading } = useContext(AuthContext);
  const userId = user?.id;
  const userName =user?.username || "Unknown";
  console.log(user?.username);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [cart, setCart] = useState<ShoppingCartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCart = async () => {
      const localToken = localStorage.getItem("token");

      if (isAuthLoading) {
        return;
      }

      if (!localToken || !userId) {
        setError("Alleen lokale accounts hebben voorlopig een winkelwagen.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const data = await getCartByUserId(userId);
        setCart(data);
      } catch (error) {
        console.error(error);
        setError("Kon winkelwagen niet ophalen.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadCart();
  }, [userId, isAuthLoading]);

  const handleCheckout = async () => {
    const localToken = localStorage.getItem("token");

    if (!localToken || !userId) {
      setError("Alleen lokale accounts kunnen voorlopig afrekenen.");
      return;
    }

    try {
      setIsCheckingOut(true);
      setError(null);

      const createdOrder = await createOrderFromCart(userId, userName);
      const checkoutSession = await createCheckoutSession(createdOrder.id);

      window.location.href = checkoutSession.sessionUrl;
    } catch (error) {
      console.error(error);
      setError("Afrekenen mislukt.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleQuantityChange = async (
    productId: string,
    selectedColor: string | undefined,
    quantity: number,
  ) => {
    if (!userId) return;

    try {
      setIsUpdating(true);
      setError(null);

      const updatedCart = await updateCartItemQuantity(userId, {
        productId,
        selectedColor,
        quantity,
      });

      setCart(updatedCart);
    } catch (error) {
      console.error(error);
      setError("Kon aantal niet aanpassen.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async (
    productId: string,
    selectedColor: string | undefined,
  ) => {
    if (!userId) return;

    try {
      setIsUpdating(true);
      setError(null);

      const updatedCart = await removeCartItem(userId, {
        productId,
        selectedColor,
        quantity: 1,
      });

      setCart(updatedCart);
    } catch (error) {
      console.error(error);
      setError("Kon item niet verwijderen.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading || isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-6">
        <div className="bg-white shadow-md rounded-2xl px-10 py-8">
          <p className="text-lg text-[#3C3C3B] font-medium">
            Winkelwagen laden...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-6">
        <div className="bg-white shadow-md rounded-2xl px-10 py-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold text-[#3C3C3B] mb-3">Oeps</h2>
          <p className="text-red-500 mb-6">{error}</p>
          <Link to="/">
            <button className="bg-yellow-500 text-[#3C3C3B] px-6 py-3 rounded-xl font-medium hover:bg-yellow-400 transition cursor-pointer">
              Terug naar home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (!cart) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-6">
        <div className="bg-white shadow-md rounded-2xl px-10 py-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold text-[#3C3C3B] mb-3">
            Geen winkelwagen gevonden
          </h2>
          <Link to="/">
            <button className="bg-yellow-500 text-[#3C3C3B] px-6 py-3 rounded-xl font-medium hover:bg-yellow-400 transition cursor-pointer">
              Verder winkelen
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-6">
        <div className="bg-white shadow-md rounded-2xl px-10 py-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold text-[#3C3C3B] mb-3">
            Winkelwagen leeg
          </h2>
          <p className="text-gray-600 mb-6">
            Je hebt nog geen producten toegevoegd.
          </p>
          <Link to="/">
            <button className="bg-yellow-500 text-[#3C3C3B] px-6 py-3 rounded-xl font-medium hover:bg-yellow-400 transition cursor-pointer">
              Verder winkelen
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-sm uppercase tracking-widest text-yellow-500 font-semibold mb-2">
                Overzicht
              </p>
              <h1 className="text-4xl md:text-5xl font-semibold text-[#3C3C3B]">
                Winkelwagen
              </h1>
            </div>

            <div className="bg-[#F8F8F8] rounded-2xl px-5 py-4 text-left md:text-right">
              <p className="text-sm text-gray-500">Totaal bedrag</p>
              <p className="text-2xl font-bold text-[#3C3C3B]">
                €{cart.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <ShoppingCart
              items={cart.items}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
              isUpdating={isUpdating}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10 pt-8 border-t border-gray-200">
            <Link to="/">
              <button className="w-full sm:w-auto border-2 border-yellow-500 text-yellow-500 px-6 py-3 rounded-xl font-medium hover:bg-yellow-50 transition cursor-pointer">
                Verder winkelen
              </button>
            </Link>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut || cart.items.length === 0}
              className="w-full sm:w-auto bg-yellow-500 text-[#3C3C3B] px-8 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? "Bezig..." : "Afrekenen"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinkelwagenPage;
