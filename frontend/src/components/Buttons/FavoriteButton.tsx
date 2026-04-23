import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../../hooks/useFavorites";

type FavoriteButtonProps = {
  productId: string;
};

const FavoriteButton = ({ productId }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(productId);

  return (
    <button type="button" onClick={() => void toggleFavorite(productId)}>
      {favorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
    </button>
  );
};

export default FavoriteButton;
