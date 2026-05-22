import { useState } from "react";
import type { ChangeEvent } from "react";
import type { Product } from "../types/Product";
type CreateProductInput = {
  name: string;
  description: string;
  price: number;
  productType: string;
  isActive: boolean;
};

// type Product = {
//   id: string;
//   name: string;
//   description?: string;
//   price: number;
//   productType: string;
//   isActive: boolean;
// };

type Props = {
  onClose: () => void;
  onCreated: (product: Product) => void;
};

const CreateProductModal = ({ onClose, onCreated }: Props) => {
  const [form, setForm] = useState<CreateProductInput>({
    name: "",
    description: "",
    price: 0,
    productType: "",
    isActive: true,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      // don’t ignore errors like a beginner
      console.error("Failed to create product");
      return;
    }

    const data: Product = await res.json();

    onCreated(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[500px] p-6 rounded-xl space-y-4">

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Product toevoegen</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Naam"
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Beschrijving"
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-2">
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Prijs"
            className="w-1/2 border p-2 rounded"
          />

          <input
            name="productType"
            value={form.productType}
            onChange={handleChange}
            placeholder="ProductType"
            className="w-1/2 border p-2 rounded"
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={() =>
              setForm((prev) => ({
                ...prev,
                isActive: !prev.isActive,
              }))
            }
          />
          Actief
        </label>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="bg-yellow-400 px-4 py-2 rounded"
          >
            Product aanmaken
          </button>

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Annuleren
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateProductModal;