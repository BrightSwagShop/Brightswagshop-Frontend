import { useMemo, useState } from "react";

const categories = ["T-Shirts", "Hoodies", "Mokken", "Drinkflessen", "Notebooks"];

type ProductItem = {
  id: string;
  name: string;
  price: number;
};

const productsByCategory: Record<string, ProductItem[]> = {
  "T-Shirts": [
    { id: "t1", name: "Basic Tee", price: 19.99 },
    { id: "t2", name: "Oversized Tee", price: 24.99 },
    { id: "t3", name: "Logo Tee", price: 22.5 },
  ],
  Hoodies: [
    { id: "h1", name: "Classic Hoodie", price: 49.99 },
    { id: "h2", name: "Zip Hoodie", price: 54.99 },
  ],
  Mokken: [
    { id: "m1", name: "Coffee Mug", price: 12.99 },
    { id: "m2", name: "Big Mug", price: 14.99 },
  ],
  Drinkflessen: [
    { id: "d1", name: "Steel Bottle", price: 18.99 },
    { id: "d2", name: "Sport Bottle", price: 15.49 },
  ],
  Notebooks: [
    { id: "n1", name: "A5 Notebook", price: 9.99 },
    { id: "n2", name: "Hardcover Notebook", price: 12.99 },
  ],
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);

  const productList = useMemo(
    () => productsByCategory[selectedCategory] ?? [],
    [selectedCategory]
  );

  return (
    <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-4">
      {/* LEFT - Categories */}
      <div className="lg:col-span-1">
        <h1 className="font-ttnorms text-3xl font-bold mb-4">Categories</h1>

        <div className="space-y-2">
          {categories.map((categoryName) => {
            const isSelected = selectedCategory === categoryName;

            return (
              <button
                key={categoryName}
                onClick={() => setSelectedCategory(categoryName)}
                className={`w-full text-left rounded-xl px-4 py-3 transition-all duration-200 font-ttnorms font-semibold
                  ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-white text-slate-700 hover:bg-slate-100 hover:shadow-sm"
                  }`}
              >
                {categoryName}
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT - Items */}
      <div className="lg:col-span-3">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-ttnorms text-2xl font-bold">{selectedCategory}</h2>
          <span className="text-sm text-slate-500">{productList.length} items</span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {productList.map((productItem) => (
            <div
              key={productItem.id}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
            >
              {/* mock image */}
              <div className="h-32 w-full rounded-xl bg-slate-100 mb-4" />

              <div className="font-ttnorms font-semibold text-slate-900">
                {productItem.name}
              </div>
              <div className="text-sm text-slate-500">€ {productItem.price.toFixed(2)}</div>

              <button className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                View
              </button>
            </div>
          ))}
        </div>

        {productList.length === 0 && (
          <div className="rounded-xl bg-white p-6 text-slate-600 shadow-sm">
            No items in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
