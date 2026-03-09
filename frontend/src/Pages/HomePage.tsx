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
        <div className="mb-12">
          <h1 className="mb-15 text-3xl font-semibold tracking-tight text-slate-900">
            BrightSwagShop
          </h1>
          <p className="mb-6 text-slate-600">
            Pick a category and add items to your cart.
          </p>
        </div>
      </div>

      {/* Full-width gray background section for grid */}
      <div className="w-full bg-[#EDEDED] pt-20 pb-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c) => (
              <Link key={c.slug} to={`/category/${c.slug}`}>
                <div
                  className="group relative overflow-hidden rounded-xl border border-[#3C3C3B] bg-white p-6 shadow-md transition hover:-translate-y-0.5 hover:border-yellow-300 hover:shadow-md"
                >
                  <div className="flex gap-6">
                    {/* Image on the left */}
                    {c.image && (
                      <img
                        src={c.image}
                        alt={c.title}
                        className="h-32 w-24 object-contain"
                      />
                    )}

                    {/* Content on the right */}
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold text-[#F4C709]">{c.title}</h2>
                      <div className="my-3 h-px w-20 bg-[#3C3C3B]" />
                      <p className="text-sm text-slate-900">{c.desc}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default HomePage;
