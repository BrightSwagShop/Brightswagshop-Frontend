import { useEffect, useMemo, useState } from "react";
import { FiInfo, FiFolder, FiMenu, FiTrash2 } from "react-icons/fi";
import Pagination from "../../components/Pagination";
import {
  getAllProducts,
  type AdminProductResponse,
} from "../../services/productService";

const itemsPerPage = 8;

const Products = () => {
  const [products, setProducts] = useState<AdminProductResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Producten konden niet worden geladen.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const categoryOptions = useMemo(
    () =>
      Array.from(new Set(products.map((product) => product.category))).filter(
        Boolean,
      ),
    [products],
  );

  const typeOptions = useMemo(
    () =>
      Array.from(
        new Set(products.map((product) => product.productType)),
      ).filter(Boolean),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesSearch =
        query.length === 0 ||
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.productType.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      const matchesType =
        typeFilter === "all" || product.productType === typeFilter;

      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "active" && product.isActive) ||
        (stockFilter === "inactive" && !product.isActive);

      return matchesSearch && matchesCategory && matchesType && matchesStock;
    });

    result.sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [products, search, categoryFilter, typeFilter, stockFilter, sortBy]);

  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter, typeFilter, stockFilter, sortBy]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("nl-BE", {
      style: "currency",
      currency: "EUR",
    }).format(value);

  const getPreviewImage = (product: AdminProductResponse) =>
    product.kleuren?.[0]?.imageUrl ?? "/placeholder.png";

  return (
    <div className="p-6 bg-[#EDEDED] min-h-screen">
      <h1 className="text-4xl font-semibold text-[#3C3C3B]  mt-1 mb-6">
        Producten
      </h1>
      <p className="text-[#3C3C3B] mt-1 mb-6">
        Productenoverzicht uit de database
      </p>

      <div className="flex gap-4 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Zoek producten..."
          className="px-4 py-3 rounded-xl bg-white   w-64"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 rounded-xl bg-white  "
        >
          <option value="all">Alle categorieën</option>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-3 rounded-xl bg-white  "
        >
          <option value="all">Alle types</option>
          {typeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="px-4 py-3 rounded-xl bg-white  "
        >
          <option value="all">Alle voorraadstatussen</option>
          <option value="active">Actief</option>
          <option value="inactive">Niet actief</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 rounded-xl bg-white  "
        >
          <option value="name">Sorteren op naam</option>
          <option value="price-asc">Prijs oplopend</option>
          <option value="price-desc">Prijs aflopend</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3 bg-white rounded-2xl overflow-hidden">
          <div className="grid grid-cols-5 px-6 py-3 bg-gray-100 text-sm text-gray-600 font-medium">
            <span>Product</span>
            <span>Categorie</span>
            <span>Prijs</span>
            <span>Status</span>
            <span>Acties</span>
          </div>

          {isLoading ? (
            <div className="px-6 py-8 text-sm text-gray-500">
              Producten laden...
            </div>
          ) : error ? (
            <div className="px-6 py-8 text-sm text-red-500">{error}</div>
          ) : paginatedProducts.length === 0 ? (
            <div className="px-6 py-8 text-sm text-gray-500">
              Geen producten gevonden voor deze filters.
            </div>
          ) : (
            paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-5 items-center px-6 py-4 border-t text-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={getPreviewImage(product)}
                    alt={product.name}
                    className="w-12 h-12 rounded-md object-cover bg-gray-100"
                  />
                  <div className="min-w-0">
                    <div className="font-medium text-[#3C3C3B] truncate">
                      {product.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {product.productType}
                    </div>
                  </div>
                </div>

                <span className="text-gray-700">{product.category}</span>
                <span className="text-gray-700 font-medium">
                  {formatCurrency(product.price)}
                </span>
                <span>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      product.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.isActive ? "Actief" : "Niet actief"}
                  </span>
                </span>

                <div className="flex gap-3 text-gray-500">
                  <FiInfo className="cursor-pointer hover:text-black" />
                  <FiTrash2 className="cursor-pointer hover:text-red-500" />
                </div>
              </div>
            ))
          )}

          <div className="flex justify-between items-center px-6 py-4 text-sm text-gray-500 border-t">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4">
            <h2 className="font-semibold mb-3">Producttypes</h2>
            {typeOptions.map((type) => {
              const count = products.filter(
                (product) => product.productType === type,
              ).length;

              return (
                <div
                  key={type}
                  className="flex justify-between items-center py-2 border-b border-gray-500"
                >
                  <div className="flex items-center gap-2">
                    <FiFolder />
                    <span>{type}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 bg-gray-200 px-2 rounded">
                      {count}
                    </span>
                    <FiMenu />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-[#f3e9c3] border border-[#F4C709] rounded-2xl p-4 flex gap-4">
            <div className="flex items-start">
              <div className="h-10 w-10 rounded-full border-2 border-[#F4C709] flex items-center justify-center text-[#F4C709]">
                <FiInfo className="text-xl" />
              </div>
            </div>

            <div>
              <div className="font-semibold text-[#3C3C3B] mb-1">Tip</div>
              <p className="text-sm text-[#3C3C3B]">
                Gebruik de filters om snel een productcategorie, type of
                voorraadstatus terug te vinden.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
