import React from "react";
import { FaCartPlus } from "react-icons/fa";

const cards = [
  { title: "Featured", desc: "Top picks for you", color: "from-sky-500 to-indigo-600" },
  { title: "New Drops", desc: "Fresh swag items", color: "from-emerald-500 to-teal-600" },
  { title: "Best Sellers", desc: "Most loved products", color: "from-amber-500 to-orange-600" },
  { title: "Limited", desc: "While supplies last", color: "from-rose-500 to-pink-600" },
  { title: "Bundles", desc: "Save more together", color: "from-violet-500 to-fuchsia-600" },
  { title: "Accessories", desc: "Small but essential", color: "from-cyan-500 to-blue-600" },
  { title: "Office", desc: "Desk + work swag", color: "from-lime-500 to-green-600" },
  { title: "Street", desc: "Wear it outside", color: "from-slate-600 to-zinc-700" },
  { title: "Gifts", desc: "Perfect for teams", color: "from-red-500 to-orange-500" },
  { title: "Eco", desc: "Sustainable choices", color: "from-green-600 to-emerald-700" },
  { title: "Premium", desc: "Upgrade your swag", color: "from-neutral-700 to-neutral-900" },
  { title: "Clearance", desc: "Last chance deals", color: "from-yellow-500 to-amber-600" },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            BrightSwagShop
          </h1>
          <p className="mt-2 text-slate-300">
            Pick a category and add items to your cart.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:border-white/20"
            >
              {/* gradient top bar */}
              <div className={`h-2 w-full rounded-full bg-gradient-to-r ${c.color}`} />

              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">{c.title}</h2>
                  <p className="mt-1 text-sm text-slate-300">{c.desc}</p>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl bg-white/10 p-3 text-white transition hover:bg-white/20 active:scale-95"
                  aria-label={`Add ${c.title} to cart`}
                  title="Add to cart"
                >
                  <FaCartPlus className="h-5 w-5" />
                </button>
              </div>

              {/* subtle glow */}
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
