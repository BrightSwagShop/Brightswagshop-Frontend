import FavoriteButton from "./FavoriteButton";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    description?: string;
    price: number;
    kleuren?: {
      imageUrl: string;
    }[];
  };
};

const ProductCard = ({ product }: ProductCardProps) => {
  const imageUrl = product.kleuren?.[0]?.imageUrl ?? "";

  return (
    <div className="rounded-xl border border-[#3C3C3B] bg-white p-6 shadow-md h-full flex flex-col">
      {imageUrl && (
        <div className="mb-4 flex h-48 items-center justify-center">
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-4 flex-1">
        <div>
          <h2 className="text-xl font-semibold text-[#3C3C3B]">
            {product.name}
          </h2>

          {product.description && (
            <p className="mt-2 text-sm text-slate-600">{product.description}</p>
          )}

          <p className="mt-4 font-bold text-[#3C3C3B]">€ {product.price}</p>
        </div>

        <FavoriteButton productId={product.id} />
      </div>
    </div>
  );
};

export default ProductCard;
