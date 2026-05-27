type TopProductProps = {
  product: {
    id: string;
    name: string;
    sold: number;
    kleuren?: {
      imageUrl: string;
    }[];
  };
  maxSold: number;
};

const TopProduct = ({ product, maxSold }: TopProductProps) => {
  const imageUrl = product.kleuren?.[0]?.imageUrl ?? "";

  const percentage = (product.sold / maxSold) * 100;

  return (
    <div className="flex items-center justify-between py-3 border-b">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-10 h-10 object-cover rounded-md"
          />
        )}

        <span className="text-gray-800">{product.name}</span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 w-40">

        {/* number */}
        <span className="w-10 text-right text-gray-700">
          {product.sold}
        </span>

        {/* bar */}
        <div className="flex-1 bg-gray-200 h-2 rounded">
          <div
            className="bg-[#F4C709] h-2 rounded"
            style={{ width: `${percentage}%` }}
          />
        </div>

      </div>
    </div>
  );
};

export default TopProduct;