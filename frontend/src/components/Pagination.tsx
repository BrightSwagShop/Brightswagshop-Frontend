type Props = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: Props) {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex justify-between items-center px-6 py-4 text-sm text-gray-500 border-t">
      <span>{start} - {end} van {totalItems} producten</span>

      <div className="flex gap-2 items-center">
        <button onClick={() => onPageChange(Math.max(currentPage - 1, 1))}>
          ‹
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-2 rounded ${
                currentPage === page
                  ? "bg-yellow-400 text-black"
                  : "hover:text-black"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() =>
            onPageChange(Math.min(currentPage + 1, totalPages))
          }
        >
          ›
        </button>
      </div>
    </div>
  );
}