import { useState } from "react";
import type { ChangeEvent } from "react";
import type { Discount } from "../types/Discount";

type CreateDiscountInput = {
  name: string;
  description: string;
  percentage: number;
  code: string;
  startsAt: string;
  endsAt?: string;
  isActive: boolean;
};

type Props = {
  onClose: () => void;
  onCreated: (discount: Discount) => void;
};

const CreatePromotieModal = ({ onClose, onCreated }: Props) => {
  const [form, setForm] = useState<CreateDiscountInput>({
    name: "",
    description: "",
    percentage: 0,
    code: "",
    startsAt: "",
    endsAt: "",
    isActive: true,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "percentage"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.name || form.percentage <= 0) {
      console.error("Invalid form");
      return;
    }

    const res = await fetch("/api/discounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      console.error("Failed to create discount");
      return;
    }

    const data: Discount = await res.json();

    onCreated(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[500px] p-6 rounded-xl space-y-4">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Promotie toevoegen</h2>
          <button onClick={onClose}>✕</button>
        </div>
          <p>Vul de nodige gegevens in om een nieuwe promotie aan te maken.</p>

        {/* NAME */}
        <p>Naam</p>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="vul de naam van de promotie in"
          className="w-full border p-2 rounded"
        />

        {/* DESCRIPTION */}
        <p>Beschrijving</p>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="vul de Beschrijving in"
          className="w-full border p-2 rounded"
        />

        {/* PERCENTAGE + CODE */}
        <div className="flex gap-3">
         <div className="flex flex-col w-1/2"> 
        <p className="mb-2">Korting (%)</p>
          <input
            name="percentage"
            type="number"
            value={form.percentage}
            onChange={handleChange}
            placeholder="Korting (%)"
            className="w-full border p-2 rounded"
          />
          </div>
          <div>

          <p  className="mb-2">Kortingscode</p>
          <input
            name="code"
            value={form.code}
            onChange={handleChange}
            placeholder="Kortingscode"
            className="w-full border p-2 rounded"
          />
         
          </div>
        </div>

        {/* DATES */}
        <div className="flex gap-3">
           <div className="flex flex-col w-2/2">
          <p  className="mb-2">Startdatum</p>
          <input
            name="startsAt"
            type="date"
            value={form.startsAt}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          </div>
          <div className="flex flex-col w-2/2"> 
          <p  className="mb-2">Einddatum</p>
          <input
            name="endsAt"
            type="date"
            value={form.endsAt}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          />
          </div>
        </div>

        {/* STATUS
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
        </label> */}

        {/* ACTIONS */}
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="bg-yellow-400 px-4 py-2 rounded-xl"
          >
            Promotie aanmaken
          </button>

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-xl"
          >
            Annuleren
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreatePromotieModal;