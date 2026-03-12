import { useParams, Link } from "react-router-dom";
import tshirt1 from "../assets/t-shirts/t-shirt1.png";
import tshirt2 from "../assets/t-shirts/t-shirt2.png";
import tshirt3 from "../assets/t-shirts/t-shirt3.png";
import tshirt4 from "../assets/t-shirts/t-shirt4.png";
import tshirt5 from "../assets/t-shirts/t-shirt5.png";
import tshirt7 from "../assets/t-shirts/t-shirt7.png";

import hoodie1 from "../assets/hoodies/hoodie1.png";
import hoodie2 from "../assets/hoodies/hoodie2.png";
import hoodie3 from "../assets/hoodies/hoodie3.png";
import hoodie4 from "../assets/hoodies/hoodie4.png";
import mok from "../assets/mokken/mok.png";
import drinkfles1 from "../assets/drinkflessen/drinkfles1.png";
import drinkfles2 from "../assets/drinkflessen/drinkfles2.png";
import drinkfles3 from "../assets/drinkflessen/drinkfles3.png";
import drinkfles4 from "../assets/drinkflessen/drinkfles4.png";
import notitieboekje1 from "../assets/notitieboeken/notitieboekje1.png";
import notitieboekje from "../assets/notitieboeken/notitieboekje.png";
import notitieboekje2 from "../assets/notitieboeken/notitieboekje2.png";
import notitieboekje3 from "../assets/notitieboeken/notitieboekje3.png";


type Item = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const mockData: Record<string, Item[]> = {
  tshirts: [
    {
      id: "ts-1",
      title: "Brightest T-shirt Classic",
      description: "Zacht katoen, regular fit.",
      image: tshirt1,
    },
    {
      id: "ts-2",
      title: "Brightest T-shirt Premium",
      description: "Premium stof met strakke afwerking.",
      image: tshirt2,
    },
    {
      id: "ts-3",
      title: "Brightest T-shirt Premium",
      description: "Premium stof met strakke afwerking.",
      image: tshirt3,
    },
     {
      id: "ts-4",
      title: "Brightest T-shirt Premium",
      description: "Premium stof met strakke afwerking.",
      image: tshirt4,
    },
     {
      id: "ts-5",
      title: "Brightest T-shirt Premium",
      description: "Premium stof met strakke afwerking.",
      image: tshirt5,
    },
     {
      id: "ts-7",
      title: "Brightest T-shirt Premium",
      description: "Premium stof met strakke afwerking.",
      image: tshirt7,
    },

  ],
  hoodies: [
    {
      id: "hd-1",
      title: "Brightest Hoodie",
      description: "Warme hoodie met comfortabele pasvorm.",
      image: hoodie1,
    },
    {
      id: "hd-2",
      title: "Brightest Hoodie",
      description: "Warme hoodie met comfortabele pasvorm.",
      image: hoodie2,
    },
    {
      id: "hd-3",
      title: "Brightest Hoodie",
      description: "Warme hoodie met comfortabele pasvorm.",
      image: hoodie3,
    },
    {
      id: "hd-4",
      title: "Brightest Hoodie",
      description: "Warme hoodie met comfortabele pasvorm.",
      image: hoodie4,
    },

  ],
  mokken: [
    {
      id: "mk-1",
      title: "Brightest Mok",
      description: "Een coole mok voor koffie of thee",
      image: mok,
    },
  ],
  drinkflessen:[
    {
      id: "df-1",
      title: "Brightest Drinkfles",
      description: "Een coole drinkfles voor water ",
      image: drinkfles1,

    },
     {
      id: "df-2",
      title: "Brightest Drinkfles",
      description: "Een coole drinkfles voor water ",
      image: drinkfles2,

    },
     {
      id: "df-3",
      title: "Brightest Drinkfles",
      description: "Een coole drinkfles voor water ",
      image: drinkfles3,

    },
     {
      id: "df-4",
      title: "Brightest Drinkfles",
      description: "Een coole drinkfles voor water ",
      image: drinkfles4,

    }
  ], notebooks:[

    {
       id: "nt-1",
      title: "Brightest notitieboeken",
      description: "Een coole notitieboek voor school of werk ",
      image: notitieboekje1,
    },
    
    {
       id: "nt-2",
      title: "Brightest notitieboeken",
      description: "Een coole notitieboek voor school of werk ",
      image: notitieboekje,
    },
    {
       id: "nt-2",
      title: "Brightest notitieboeken",
      description: "Een coole notitieboek voor school of werk ",
      image: notitieboekje2,
    },
    {
       id: "nt-3",
      title: "Brightest notitieboeken",
      description: "Een coole notitieboek voor school of werk ",
      image: notitieboekje3,
    }
  ]

};

const CategoryItemsPage = () => {
  const { category } = useParams<{ category: string }>();

  const items = category ? mockData[category] : undefined;

  if (!items) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900">
          Categorie niet gevonden
        </h1>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-10 bg-white">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-[#F4C709] pl-2 pr-4 py-2 text-sm font-medium text-[#3C3C3B] hover:opacity-90 transition mb-6 -ml-25"
          >
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            Categorieën
          </Link>
          <h1 className="mb-12 text-3xl font-extrabold text-slate-900 capitalize">
            {category}
          </h1>
          <p className="mb-6 mt-2 text-slate-600">
            Bekijk alle items in deze categorie.
          </p>
        </div>
      </div>

      {/* Full-width gray background section for grid */}
      <div className="w-full bg-[#EDEDED] pt-16 pb-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="bg-slate-50 p-6 flex justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-44 w-auto object-contain"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-slate-500">
                      Prijs: binnenkort
                    </span>
                    <button
                      disabled
                      className="rounded-lg bg-yellow-400/60 px-4 py-2 text-sm font-semibold text-[#3C3C3B] cursor-not-allowed"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryItemsPage;
