import tshirt4 from "../assets/t-shirts/t-shirt4.png";
import { Link } from "react-router-dom";
import hoodie1 from "../assets/hoodies/hoodie1.png";
import mok from "../assets/mokken/mok.png";
import drinkfles1 from "../assets/drinkflessen/drinkfles1.png";
import notitieboekje1 from "../assets/notitieboeken/notitieboekje1.png";

const cards = [
{ title: "T-shirts", desc: "Comfortabele T-shirts met jouw branding.", color: "from-yellow-400 to-amber-500",to: "/tshirts",image: tshirt4,slug: "tshirts", },
{ title: "Hoodies", desc: "Warme hoodies voor dagelijks gebruik.", color: "from-yellow-300 to-yellow-500", slug: "hoodies",image:hoodie1 },
{ title: "Mokken", desc: "Bedrukte mokken voor koffie en thee op kantoor.", color: "from-amber-400 to-yellow-500", slug:"mokken", image: mok },
{ title: "Drinkflessen", desc: "Herbruikbare flessen voor werk en onderweg.", color: "from-yellow-400 to-orange-400", slug:"drinkflessen", image:drinkfles1 },
{ title: "Notebooks", desc: "Praktische notitieboeken voor werk en meetings.", color: "from-yellow-300 to-amber-400" , slug:"notebooks",image: notitieboekje1},
{ title: "Pennen", desc: "Eenvoudige pennen die iedereen gebruikt.", color: "from-amber-300 to-yellow-500" , slug: "pennen"},
{ title: "Stickers", desc: "Leuke stickers voor laptops en notitieboeken.", color: "from-yellow-400 to-amber-600", slug:"stickers" },
{ title: "Tote bags", desc: "Herbruikbare draagtassen voor dagelijks gebruik.", color: "from-yellow-300 to-yellow-600",slug:"tote bags" },
{ title: "Laptopstickers", desc: "Kwalitatieve stickers voor teamlaptops.", color: "from-amber-400 to-yellow-600", slug:"laptopstickers" },
{ title: "LaptopSleeves", desc: "Beschermhoezen met een professionele uitstraling.", color: "from-yellow-300 to-amber-500",slug:"laptopsleeves" },
{ title: "Powerbanks", desc: "Draagbare opladers voor drukke werkdagen.", color: "from-yellow-400 to-amber-700" , slug: "powerbanks"},

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
            <Link key={c.slug} to={`/category/${c.slug}`}>
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

                <img
                  src={c.image}
                  alt={c.title}
                  className="h-20 w-12 object-contain opacity-90"
                />


                 
                {/* 
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-xl border border-yellow-200 bg-yellow-50 p-3 text-yellow-700 transition hover:bg-yellow-100 active:scale-95"
                    aria-label={`Add ${c.title} to cart`}
                    title="Add to cart"
                  >
                    <FaCartPlus className="h-5 w-5" />
                  </button> 
                */}
              </div>

              {/* subtle warm glow */}
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-r ${c.color} opacity-20 blur-2xl transition group-hover:opacity-30`}
              />
            </div>
             </Link>
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default HomePage;
