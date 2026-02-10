import { useParams } from "react-router-dom";
import tshirt1 from "../assets/t-shirts/t-shirt1.png";
import tshirt2 from "../assets/t-shirts/t-shirt2.png";
import hoodie1 from "../assets/t-shirts/t-shirt3.png";

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
  ],
  hoodies: [
    {
      id: "hd-1",
      title: "Brightest Hoodie",
      description: "Warme hoodie met comfortabele pasvorm.",
      image: hoodie1,
    },
  ],
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
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 capitalize">
            {category}
          </h1>
          <p className="mt-2 text-slate-600">
            Bekijk alle items in deze categorie.
          </p>
          <div className="mt-4 h-1 w-24 rounded-full bg-yellow-400" />
        </div>

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
                    className="rounded-lg bg-yellow-400/60 px-4 py-2 text-sm font-semibold text-white cursor-not-allowed"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryItemsPage;
