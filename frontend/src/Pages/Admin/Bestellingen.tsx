import { useEffect, useMemo, useState } from "react";
import Pagination from "../../components/Pagination";
import { getAllOrders, type OrderResponse } from "../../API/OrderAPI";

const itemsPerPage = 8;

const paymentOptions = [
  "all",
  "pending",
  "paid",
  "failed",
  "refunded",
] as const;

const Bestellingen = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] =
    useState<(typeof paymentOptions)[number]>("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError("Bestellingen konden niet worden geladen.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const filteredOrders = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = orders.filter((order) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        order.id.toLowerCase().includes(normalizedSearch) ||
        order.userId.toLowerCase().includes(normalizedSearch) ||
        order.paymentStatus.toLowerCase().includes(normalizedSearch);

      const matchesPayment =
        paymentFilter === "all" ||
        order.paymentStatus.toLowerCase() === paymentFilter;

      return matchesSearch && matchesPayment;
    });

    result.sort((a, b) => {
      if (sortBy === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }

      if (sortBy === "highest") {
        return b.totalPrice - a.totalPrice;
      }

      if (sortBy === "lowest") {
        return a.totalPrice - b.totalPrice;
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return result;
  }, [orders, paymentFilter, search, sortBy]);

  const totalItems = filteredOrders.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [search, paymentFilter, sortBy]);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("nl-BE", {
      style: "currency",
      currency: "EUR",
    }).format(value);

  const formatDate = (value: string) =>
    new Intl.DateTimeFormat("nl-BE", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));

  return (
    <div className="p-6 bg-[#EDEDED] min-h-screen">
      <h1 className="text-4xl font-semibold text-[#3C3C3B]  mt-1 mb-6">
        Bestellingen
      </h1>
      <p className="text-[#3C3C3B] mt-1 mb-6">
        Overzicht van alle bestellingen uit de database
      </p>

      <div className="flex gap-4 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Zoek op order, user, status..."
          className="px-4 py-3 rounded-xl bg-white   w-64"
        />

        <select
          value={paymentFilter}
          onChange={(e) =>
            setPaymentFilter(e.target.value as (typeof paymentOptions)[number])
          }
          className="px-4 py-3 rounded-xl bg-white  "
        >
          {paymentOptions.map((option) => (
            <option key={option} value={option}>
              {option === "all"
                ? "Alle payment statuses"
                : option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 rounded-xl bg-white  "
        >
          <option value="newest">Nieuwste eerst</option>
          <option value="oldest">Oudste eerst</option>
          <option value="highest">Hoogste totaal</option>
          <option value="lowest">Laagste totaal</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3 bg-white rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[3fr_2fr_1fr_1fr_1fr_1fr] px-6 py-3 bg-gray-100 text-sm text-gray-600 font-medium">
            <span>BestellingID</span>
            <span>Gebruiker</span>
            <span>Aantal items</span>
            <span>Totale prijs</span>
            <span>Status</span>
            <span>Betaling</span>
          </div>

          {isLoading ? (
            <div className="px-6 py-8 text-sm text-gray-500">
              Bestellingen laden...
            </div>
          ) : error ? (
            <div className="px-6 py-8 text-sm text-red-500">{error}</div>
          ) : paginatedOrders.length === 0 ? (
            <div className="px-6 py-8 text-sm text-gray-500">
              Geen bestellingen gevonden voor deze filters.
            </div>
          ) : (
            paginatedOrders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-[3fr_2fr_1fr_1fr_1fr_1fr] items-center px-6 py-4 border-t border-gray-100 text-sm"
              >
                <div>
                  <div className="font-medium text-[#3C3C3B]">{order.id}</div>
                  <div className="text-xs text-gray-500">
                    {formatDate(order.createdAt)}
                  </div>
                </div>

                <span className="text-gray-700">{order.userName}</span>

                <span className="text-gray-700">{order.items.length}</span>

                <span className="text-gray-700 font-medium">
                  {formatCurrency(order.totalPrice)}
                </span>

                <span className="inline-flex w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  {order.status}
                </span>

                <span className="inline-flex w-fit rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                  {order.paymentStatus}
                </span>
              </div>
            ))
          )}

          <div className="flex justify-between items-center px-6 py-4 text-sm text-gray-500 border-t">
            <div>Totaal {totalItems} bestellingen</div>
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
            <h2 className="font-semibold mb-3">Snelle statistiek</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Totaal geladen</span>
                <span className="font-medium">{orders.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Gefilterd</span>
                <span className="font-medium">{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span>Pagina</span>
                <span className="font-medium">
                  {currentPage} / {totalPages}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bestellingen;
