 
import { FiInfo,FiEdit,FiTrash2  } from "react-icons/fi";
import AdminProductCard from "../../components/AdminProductCard";
import { useState } from "react";
import type { Product } from "../../types/Product";
import Pagination from "../../components/Pagination";
 import { FiFolder,FiMenu } from "react-icons/fi";
import CreateProductModal from "../../components/CreateProductModal";
const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 8;
const [isOpen, setIsOpen] = useState(false);

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
        Producten
      </h1>
      <p className="text-[#3C3C3B] mt-1 mb-6">
        Productenoverzicht
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
            <span>Product</span>
            <span>Categorie</span>
            <span>Prijs</span>
            <span>Voorraad</span>
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

        {/* RIGHT = CATEGORIES */}
        <div className="space-y-4">

          <div className="bg-white rounded-2xl p-4">
            <h2 className="font-semibold mb-3">Producttypes</h2>
           {["T-shirts", "Hoodies", "Mokken"].map((c) => (
            <div
              key={c}
              className="flex justify-between items-center py-2 border-b border-gray-500"
            >
              {/* LEFT */}
              <div className="flex items-center gap-2">
                <FiFolder />
                <span>{c}</span>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 bg-gray-200 px-2 rounded">
                  8
                </span>
                <FiMenu />
              </div>
            </div>
          ))}
          </div>

          <div className="bg-[#f3e9c3] border border-[#F4C709] rounded-2xl p-4 flex gap-4">

            {/* ICON */}
            <div className="flex items-start">
              <div className="h-10 w-10 rounded-full border-2 border-[#F4C709] flex items-center justify-center text-[#F4C709]">
                <FiInfo className="text-xl" />
              </div>
            </div>

            {/* TEXT */}
            <div>
              <div className="font-semibold text-[#3C3C3B] mb-1">
                Tip
              </div>
              <p className="text-sm text-[#3C3C3B]">
                Sleep Producttypes om de volgorde te veranderen.
              </p>
            </div>

          </div>

           

          <button
            onClick={() => setIsOpen(true)}
            className="w-full bg-yellow-400 py-3 rounded-xl font-semibold"
          >
            Product aanmaken
          </button>

          {isOpen && (
            <CreateProductModal
              onClose={() => setIsOpen(false)}
              onCreated={(newProduct) =>
                setProducts((prev) => [...prev, newProduct])
              }
            />
          )}

        </div>

      </div>
    </div>
  );
};

export default Products;
