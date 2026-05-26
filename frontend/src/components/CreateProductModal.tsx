import { useState } from "react";
import { useEffect } from "react";
import type { ChangeEvent } from "react";
import api from "../API/api";
import type { Product } from "../types/Product";
import type { AdminProductResponse } from "../services/productService";

type ProductKind =
  | "TShirt"
  | "Hoodie"
  | "Sportkledij"
  | "Sokken"
  | "Drinkfles"
  | "Mok"
  | "Onderlegger"
  | "Balpen"
  | "Eendje";

const clothingProductTypes: ProductKind[] = [
  "TShirt",
  "Hoodie",
  "Sportkledij",
  "Sokken",
];
type CategoryKind = "Kleding" | "Drinkartikelen" | "Accessoires";

type SizeVariantInput = {
  maat: string;
  stock: string;
  sku: string;
};

type MugColorInput = {
  kleur: string;
  imageUrl: string;
  stock: string;
  sku: string;
};

type ClothingColorInput = {
  kleur: string;
  imageUrl: string;
  maten: SizeVariantInput[];
};

type ColorInput = MugColorInput | ClothingColorInput;

type BackendProductType = "SimpleProduct" | "ProductWithSizes";

type CreateProductInput = {
  $type: ProductKind;
  name: string;
  description: string;
  price: string;
  category: CategoryKind;
  productType: ProductKind;
  isActive: boolean;
  kleuren: ColorInput[];
};

type ProductFormMode = "create" | "edit";

type Props = {
  mode?: ProductFormMode;
  initialProduct?: AdminProductResponse | null;
  onClose: () => void;
  onCreated: (product: Product) => void;
};

const createEmptySize = (): SizeVariantInput => ({
  maat: "",
  stock: "0",
  sku: "",
});

const createEmptyColor = (productType: ProductKind): ColorInput =>
  productType === "Mok"
    ? {
        kleur: "",
        imageUrl: "",
        stock: "0",
        sku: "",
      }
    : {
        kleur: "",
        imageUrl: "",
        maten: [createEmptySize()],
      };

const inferCategory = (category: string): CategoryKind => {
  if (
    category === "Kleding" ||
    category === "Drinkartikelen" ||
    category === "Accessoires"
  ) {
    return category;
  }

  return "Accessoires";
};

const inferProductType = (productType: string): ProductKind => {
  const allowedTypes: ProductKind[] = [
    "TShirt",
    "Hoodie",
    "Sportkledij",
    "Sokken",
    "Drinkfles",
    "Mok",
    "Onderlegger",
    "Balpen",
    "Eendje",
  ];

  return allowedTypes.includes(productType as ProductKind)
    ? (productType as ProductKind)
    : "Hoodie";
};

const isClothingProductType = (productType: ProductKind) =>
  ["TShirt", "Hoodie", "Sportkledij", "Sokken"].includes(productType);

const createInitialForm = (
  initialProduct?: AdminProductResponse | null,
): CreateProductInput => {
  if (!initialProduct) {
    return {
      $type: "Hoodie",
      name: "",
      description: "",
      price: "0",
      category: "Kleding",
      productType: "Hoodie",
      isActive: true,
      kleuren: [createEmptyColor("Hoodie")],
    };
  }

  const productType = inferProductType(initialProduct.productType);
  const usesSizes = isClothingProductType(productType);

  return {
    $type: productType,
    name: initialProduct.name,
    description: initialProduct.description ?? "",
    price: initialProduct.price.toString(),
    category: inferCategory(initialProduct.category),
    productType,
    isActive: initialProduct.isActive,
    kleuren:
      initialProduct.kleuren?.length > 0
        ? initialProduct.kleuren.map((color) =>
            usesSizes
              ? {
                  kleur: color.kleur ?? "",
                  imageUrl: color.imageUrl ?? "",
                  maten:
                    Array.isArray(color.maten) && color.maten.length > 0
                      ? color.maten.map((size) => ({
                          maat:
                            typeof (size as { maat?: unknown }).maat ===
                            "string"
                              ? ((size as { maat: string }).maat ?? "")
                              : "",
                          stock:
                            typeof (size as { stock?: unknown }).stock ===
                            "number"
                              ? String((size as { stock: number }).stock)
                              : "0",
                          sku:
                            typeof (size as { sku?: unknown }).sku === "string"
                              ? ((size as { sku: string }).sku ?? "")
                              : "",
                        }))
                      : [createEmptySize()],
                }
              : {
                  kleur: color.kleur ?? "",
                  imageUrl: color.imageUrl ?? "",
                  stock:
                    typeof color.stock === "number" ? String(color.stock) : "0",
                  sku: color.sku ?? "",
                },
          )
        : [createEmptyColor(productType)],
  };
};

const CreateProductModal = ({
  mode = "create",
  initialProduct = null,
  onClose,
  onCreated,
}: Props) => {
  const [form, setForm] = useState<CreateProductInput>(
    createInitialForm(initialProduct),
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setForm(createInitialForm(initialProduct));
  }, [initialProduct]);

  const usesSizes = clothingProductTypes.includes(form.$type);
  const backendProductType: BackendProductType = usesSizes
    ? "ProductWithSizes"
    : "SimpleProduct";

  const getDefaultCategory = (productType: ProductKind): CategoryKind => {
    if (clothingProductTypes.includes(productType)) {
      return "Kleding";
    }

    if (productType === "Drinkfles" || productType === "Mok") {
      return "Drinkartikelen";
    }

    return "Accessoires";
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm(
      (prev) =>
        ({
          ...prev,
          [name]: value,
        }) as CreateProductInput,
    );
  };

  const handleProductTypeChange = (value: ProductKind) => {
    setForm((prev) => ({
      ...prev,
      $type: value,
      productType: value,
      category: getDefaultCategory(value),
      kleuren: [createEmptyColor(value)],
    }));
  };

  const handleColorFieldChange = (
    colorIndex: number,
    field: keyof MugColorInput | keyof ClothingColorInput,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      kleuren: prev.kleuren.map((color, index) =>
        index === colorIndex
          ? ({ ...color, [field]: value } as ColorInput)
          : color,
      ),
    }));
  };

  const handleSizeFieldChange = (
    colorIndex: number,
    sizeIndex: number,
    field: keyof SizeVariantInput,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      kleuren: prev.kleuren.map((color, index) => {
        if (
          index !== colorIndex ||
          !clothingProductTypes.includes(prev.$type)
        ) {
          return color;
        }

        const clothingColor = color as ClothingColorInput;

        return {
          ...clothingColor,
          maten: clothingColor.maten.map((size, currentIndex) =>
            currentIndex === sizeIndex ? { ...size, [field]: value } : size,
          ),
        };
      }),
    }));
  };

  const handleAddColor = () => {
    setForm((prev) => ({
      ...prev,
      kleuren: [...prev.kleuren, createEmptyColor(prev.$type)],
    }));
  };

  const handleRemoveColor = (colorIndex: number) => {
    setForm((prev) => ({
      ...prev,
      kleuren: prev.kleuren.filter((_, index) => index !== colorIndex),
    }));
  };

  const handleAddSize = (colorIndex: number) => {
    setForm((prev) => ({
      ...prev,
      kleuren: prev.kleuren.map((color, index) => {
        if (
          index !== colorIndex ||
          !clothingProductTypes.includes(prev.$type)
        ) {
          return color;
        }

        const clothingColor = color as ClothingColorInput;

        return {
          ...clothingColor,
          maten: [...clothingColor.maten, createEmptySize()],
        };
      }),
    }));
  };

  const handleRemoveSize = (colorIndex: number, sizeIndex: number) => {
    setForm((prev) => ({
      ...prev,
      kleuren: prev.kleuren.map((color, index) => {
        if (index !== colorIndex || prev.$type === "Mok") {
          return color;
        }

        const clothingColor = color as ClothingColorInput;

        return {
          ...clothingColor,
          maten: clothingColor.maten.filter(
            (_, currentIndex) => currentIndex !== sizeIndex,
          ),
        };
      }),
    }));
  };

  const handleSubmit = async () => {
    setErrorMessage(null);

    if (
      form.name.trim().length === 0 ||
      form.description.trim().length === 0 ||
      form.category.trim().length === 0 ||
      Number.isNaN(Number(form.price)) ||
      form.kleuren.length === 0
    ) {
      setErrorMessage("Vul alle verplichte velden in.");
      return;
    }

    if (
      form.kleuren.some(
        (color) =>
          color.kleur.trim().length === 0 || color.imageUrl.trim().length === 0,
      )
    ) {
      setErrorMessage("Elke kleur moet een naam en afbeelding hebben.");
      return;
    }

    if (
      usesSizes &&
      form.kleuren.some(
        (color) =>
          !("maten" in color) ||
          color.maten.length === 0 ||
          color.maten.some(
            (size) =>
              size.maat.trim().length === 0 || size.sku.trim().length === 0,
          ),
      )
    ) {
      setErrorMessage(
        "Elke kledingkleur heeft minstens één maat nodig met maat en SKU.",
      );
      return;
    }

    if (
      !usesSizes &&
      form.kleuren.some(
        (color) => !("stock" in color) || color.sku.trim().length === 0,
      )
    ) {
      setErrorMessage("Elke mokkleur heeft voorraad en SKU nodig.");
      return;
    }

    const payload = {
      $type: backendProductType,
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category: form.category,
      productType: form.productType,
      isActive: form.isActive,
      kleuren: form.kleuren.map((color) =>
        usesSizes
          ? {
              kleur: color.kleur.trim(),
              imageUrl: color.imageUrl.trim(),
              maten: (color as ClothingColorInput).maten.map((size) => ({
                maat: size.maat.trim(),
                stock: Number(size.stock),
                sku: size.sku.trim(),
              })),
            }
          : {
              kleur: color.kleur.trim(),
              imageUrl: color.imageUrl.trim(),
              stock: Number((color as MugColorInput).stock),
              sku: (color as MugColorInput).sku.trim(),
            },
      ),
    };

    try {
      const res =
        mode === "edit" && initialProduct?.id
          ? await api.put(`/api/products/${initialProduct.id}`, payload)
          : await api.post("/api/products", payload);
      onCreated(res.data as Product);
      onClose();
    } catch (error) {
      console.error(error);
      if (typeof error === "object" && error !== null && "response" in error) {
        const response = error.response as {
          data?: { message?: string; error?: string } | string;
        };
        const apiMessage =
          typeof response.data === "string"
            ? response.data
            : (response.data?.message ?? response.data?.error);

        setErrorMessage(apiMessage ?? "Product kon niet worden aangemaakt.");
        return;
      }

      setErrorMessage("Product kon niet worden aangemaakt.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Product toevoegen</h2>
          <button type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-700">
              Product type
            </span>
            <select
              value={form.$type}
              onChange={(e) =>
                handleProductTypeChange(e.target.value as ProductKind)
              }
              className="w-full rounded border p-2"
            >
              <option value="TShirt">T-shirt</option>
              <option value="Hoodie">Hoodie</option>
              <option value="Sportkledij">Sportkledij</option>
              <option value="Sokken">Sokken</option>
              <option value="Drinkfles">Drinkfles</option>
              <option value="Mok">Mok</option>
              <option value="Onderlegger">Onderlegger</option>
              <option value="Balpen">Balpen</option>
              <option value="Eendje">Eendje</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-700">Categorie</span>
            <select
              name="category"
              value={form.category}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  category: e.target.value as CategoryKind,
                }))
              }
              className="w-full rounded border p-2"
            >
              <option value="Kleding">Kleding</option>
              <option value="Drinkartikelen">Drinkartikelen</option>
              <option value="Accessoires">Accessoires</option>
            </select>
          </label>
        </div>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Naam"
          className="w-full rounded border p-2"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Beschrijving"
          className="w-full rounded border p-2"
        />

        <div className="flex gap-2">
          <input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            placeholder="Prijs"
            className="w-1/2 rounded border p-2"
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

        <div className="space-y-4 rounded-lg border p-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-semibold">Kleuren</h3>
            <button
              type="button"
              onClick={handleAddColor}
              className="rounded bg-gray-100 px-3 py-1 text-sm font-medium"
            >
              Kleur toevoegen
            </button>
          </div>

          <div className="space-y-4">
            {form.kleuren.map((color, colorIndex) => (
              <div key={colorIndex} className="space-y-3 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Kleur {colorIndex + 1}</h4>
                  {form.kleuren.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(colorIndex)}
                      className="text-sm text-red-600"
                    >
                      Verwijderen
                    </button>
                  )}
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    value={color.kleur}
                    onChange={(e) =>
                      handleColorFieldChange(
                        colorIndex,
                        "kleur",
                        e.target.value,
                      )
                    }
                    placeholder="Kleur"
                    className="w-full rounded border p-2"
                  />

                  <input
                    value={color.imageUrl}
                    onChange={(e) =>
                      handleColorFieldChange(
                        colorIndex,
                        "imageUrl",
                        e.target.value,
                      )
                    }
                    placeholder="Afbeelding URL"
                    className="w-full rounded border p-2"
                  />
                </div>

                {usesSizes ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <h5 className="text-sm font-semibold text-gray-700">
                        Maten
                      </h5>
                      <button
                        type="button"
                        onClick={() => handleAddSize(colorIndex)}
                        className="rounded bg-gray-100 px-3 py-1 text-sm font-medium"
                      >
                        Maat toevoegen
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(color as ClothingColorInput).maten.map(
                        (size, sizeIndex) => (
                          <div
                            key={sizeIndex}
                            className="grid gap-3 md:grid-cols-4"
                          >
                            <input
                              value={size.maat}
                              onChange={(e) =>
                                handleSizeFieldChange(
                                  colorIndex,
                                  sizeIndex,
                                  "maat",
                                  e.target.value,
                                )
                              }
                              placeholder="Maat"
                              className="w-full rounded border p-2"
                            />

                            <input
                              value={size.stock}
                              onChange={(e) =>
                                handleSizeFieldChange(
                                  colorIndex,
                                  sizeIndex,
                                  "stock",
                                  e.target.value,
                                )
                              }
                              type="number"
                              placeholder="Voorraad"
                              className="w-full rounded border p-2"
                            />

                            <input
                              value={size.sku}
                              onChange={(e) =>
                                handleSizeFieldChange(
                                  colorIndex,
                                  sizeIndex,
                                  "sku",
                                  e.target.value,
                                )
                              }
                              placeholder="SKU"
                              className="w-full rounded border p-2"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveSize(colorIndex, sizeIndex)
                              }
                              className="rounded border px-3 py-2 text-sm"
                            >
                              Verwijderen
                            </button>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-3 md:grid-cols-2">
                    <input
                      value={(color as MugColorInput).stock}
                      onChange={(e) =>
                        handleColorFieldChange(
                          colorIndex,
                          "stock",
                          e.target.value,
                        )
                      }
                      type="number"
                      placeholder="Voorraad"
                      className="w-full rounded border p-2"
                    />

                    <input
                      value={(color as MugColorInput).sku}
                      onChange={(e) =>
                        handleColorFieldChange(
                          colorIndex,
                          "sku",
                          e.target.value,
                        )
                      }
                      placeholder="SKU"
                      className="w-full rounded border p-2"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {errorMessage && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded bg-yellow-400 px-4 py-2 font-medium"
          >
            {mode === "edit" ? "Product bijwerken" : "Product aanmaken"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Annuleren
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
