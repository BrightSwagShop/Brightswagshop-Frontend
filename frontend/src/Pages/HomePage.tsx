import React from "react";
import { FaCartPlus } from "react-icons/fa";

const cards = [
  { title: "Featured", desc: "Top picks for you", color: "from-yellow-400 to-amber-500" },
  { title: "New Drops", desc: "Fresh swag items", color: "from-yellow-300 to-yellow-500" },
  { title: "Best Sellers", desc: "Most loved products", color: "from-amber-400 to-yellow-500" },
  { title: "Limited", desc: "While supplies last", color: "from-yellow-400 to-orange-400" },
  { title: "Bundles", desc: "Save more together", color: "from-yellow-300 to-amber-400" },
  { title: "Accessories", desc: "Small but essential", color: "from-amber-300 to-yellow-500" },
  { title: "Office", desc: "Desk + work swag", color: "from-yellow-400 to-amber-600" },
  { title: "Street", desc: "Wear it outside", color: "from-yellow-300 to-yellow-600" },
  { title: "Gifts", desc: "Perfect for teams", color: "from-amber-400 to-yellow-600" },
  { title: "Eco", desc: "Sustainable choices", color: "from-yellow-300 to-amber-500" },
  { title: "Premium", desc: "Upgrade your swag", color: "from-yellow-400 to-amber-700" },
  { title: "Clearance", desc: "Last chance deals", color: "from-yellow-300 to-orange-500" },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Title block aligned with your header vibe */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            BrightSwagShop
          </h1>
          <p className="mt-2 text-slate-600">
            Pick a category and add items to your cart.
          </p>
          <div className="mt-4 h-1 w-24 rounded-full bg-yellow-400" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white px-4 py-6 min-h-200px  shadow-sm transition hover:-translate-y-0.5 hover:border-yellow-300 hover:shadow-md"

            >
              {/* yellow-ish gradient top bar */}
              <div className={`h-2 w-full rounded-full bg-gradient-to-r ${c.color}`} />

              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {c.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">{c.desc}</p>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl border border-yellow-200 bg-yellow-50 p-3 text-yellow-700 transition hover:bg-yellow-100 active:scale-95"
                  aria-label={`Add ${c.title} to cart`}
                  title="Add to cart"
                >
                  <FaCartPlus className="h-5 w-5" />
                </button>
              </div>

              {/* subtle warm glow */}
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-r ${c.color} opacity-20 blur-2xl transition group-hover:opacity-30`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
