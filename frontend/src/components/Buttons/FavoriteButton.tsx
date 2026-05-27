import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, type MouseEvent, useEffect } from "react";
import { useFavorites } from "../../hooks/useFavorites";

type FavoriteButtonProps = {
  productId: string;
};

const FavoriteButton = ({ productId }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isPending, setIsPending] = useState(false);

  const favorite = isFavorite(productId);

  useEffect(() => {
    setIsPending(false);
  }, [favorite]);

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsPending(true);

    try {
      await toggleFavorite(productId);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={
        favorite ? "Verwijder uit favorieten" : "Voeg toe aan favorieten"
      }
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white text-lg shadow-sm transition ${
        isPending
          ? "cursor-wait border-gray-200 text-gray-300"
          : "border-gray-200 hover:border-yellow-400 hover:text-red-500"
      }`}
    >
      {favorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
    </button>
  );
};

export default FavoriteButton;
