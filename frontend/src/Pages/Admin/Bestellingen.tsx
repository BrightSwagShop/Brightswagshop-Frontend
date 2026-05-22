 
import { FiEdit,FiTrash2  } from "react-icons/fi";
import AdminProductCard from "../../components/AdminProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../../types/Product";
import Pagination from "../../components/Pagination";
 
import { getDiscounts } from "../../services/getDiscounts";
import type { Discount } from "../../types/Discount";
import CreatePromotieModal from "../../components/CreatePromotieModal";
const Bestellingen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 8;
const [isOpen, setIsOpen] = useState(false);
const [discounts, setDiscounts] = useState<Discount[]>([]);
useEffect(() => {
  const load = async () => {
    try {
      const data = await getDiscounts();
      setDiscounts(data);
    } catch (err) {
      console.error(err);
    }
  };

  load();
}, []);
const openDeleteModal = (id: string) => {
  void id;
};
  const handleToggleStock = async (id: string, value: boolean) => {
  await fetch(`/api/products/${id}/stock`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive: value }),
  });

  setProducts((prev) =>
    prev.map((p) =>
      p.id === id ? { ...p, isActive: value } : p
    )
  );
};

  return (
    <div className="p-6 bg-[#EDEDED] min-h-screen">

      {/* HEADER */}
      <h1 className="text-4xl font-semibold text-[#3C3C3B]  mt-1 mb-6">
        Bestellingen
      </h1>
      <p className="text-[#3C3C3B] mt-1 mb-6">
       Bestellingenoverzicht
      </p>

      {/* FILTER BAR */}
      <div className="flex gap-4 mb-6">
        <input
          placeholder="Zoek producten..."
          className="px-4 py-3 rounded-xl bg-white   w-64"
        />

        <select className="px-4 py-3 rounded-xl bg-white  ">
          <option>Alle categorieën</option>
        </select>

        <select className="px-4 py-3 rounded-xl bg-white  ">
          <option>Sorteren op</option>
        </select>
      </div>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-4 gap-6">

        {/* LEFT = TABLE */}
        <div className="col-span-3 bg-white rounded-2xl overflow-hidden">

          {/* TABLE HEADER */}
          <div className="grid grid-cols-5 px-6 py-3 bg-gray-100 text-sm text-gray-600">
            <span>BestellingID</span>
            <span>Aantal Producten</span>
            <span> Totale prijs</span>
            <span>Acties</span>
          </div>

          {/* ROWS */}
          {products.map((p) => (
            <div
               
              className="grid grid-cols-5 items-center px-6 py-4 "
            >
              {/* PRODUCT */}
              <AdminProductCard
              key={p.id}
              product={p}
              onDelete={openDeleteModal}
              onToggleStock={handleToggleStock}
              />

              {/* ACTIONS */}
              <div className="flex gap-3 text-gray-500">
                <FiEdit className="cursor-pointer hover:text-black" />
                <FiTrash2 className="cursor-pointer hover:text-red-500" />
              </div>
            </div>
          ))}

          {/* FOOTER */}
          <div className="flex justify-between items-center px-6 py-4 text-sm text-gray-500 border-t">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(products.length / itemsPerPage)}
              totalItems={products.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>

        </div>

        {/* RIGHT = Promoties */}
        <div className="space-y-4">

         <div className="bg-white rounded-2xl p-4">
            <h2 className="font-semibold mb-3">Promoties</h2>

            {discounts.map((d) => (
                <div
                key={d.id}
                className="flex justify-between items-center py-2 border-b border-gray-300"
                >
                {/* LEFT */}
                <div>
                    <div className="font-medium">{d.name}</div>
                    <div className="text-sm text-gray-500">
                    Code: {d.code}
                    </div>
                    <div className="text-xs text-gray-400">
                    {new Date(d.startsAt).toLocaleDateString()} -{" "}
                    {d.endsAt ? new Date(d.endsAt).toLocaleDateString() : "-"}
                    </div>
                </div>

                {/* RIGHT */}
                <span className="bg-yellow-400 px-2 rounded text-sm font-semibold">
                    {d.percentage}%
                </span>
                </div>
            ))}
            </div>
          
        
          <button
            onClick={() => setIsOpen(true)}
            className="w-full bg-yellow-400 py-3 rounded-xl font-semibold"
          >
            Nieuwe Promotie
          </button>

          {isOpen && (
            <CreatePromotieModal
                onClose={() => setIsOpen(false)}
                onCreated={(newDiscount) =>
                setDiscounts((prev) => [...prev, newDiscount])
                }
            />
            )}

        </div>

      </div>
    </div>
  );
};

export default Bestellingen;
