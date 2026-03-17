import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Loading from "../components/Loading";
import ErrorComponent from "../components/ErrorComponent";

// Images import
import tshirt4 from "../assets/t-shirts/t-shirt4.png";
import hoodie1 from "../assets/hoodies/hoodie1.png";
import mok from "../assets/mokken/mok.png";
import drinkfles1 from "../assets/drinkflessen/drinkfles1.png";
import notitieboekje1 from "../assets/notitieboeken/notitieboekje1.png";

type ProductType = {
  name: string;
  slug: string;
};

const imageMap: Record<string, string> = {
  tshirt: tshirt4,
  hoodie: hoodie1,
  mok: mok,
  drinkfles: drinkfles1,
  notebook: notitieboekje1,
};

const descMap: Record<string, string> = {
  tshirt: "Comfortabele T-shirts met jouw branding.",
  hoodie: "Warme hoodies voor dagelijks gebruik.",
  mok: "Bedrukte mokken voor koffie en thee op kantoor.",
  sticker: "Leuke stickers voor laptops en notitieboeken.",
  drinkfles: "Herbruikbare flessen voor werk en onderweg.",
  notebook: "Praktische notitieboeken voor werk en meetings.",
};

const HomePage = () => {
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProductTypes = async () => {
      try {
        const response = await axios.get<ProductType[]>(
          `${import.meta.env.VITE_API_URL}/api/producttypes`
        );
        setProductTypes(response.data);
      } catch (err) {
        setError("Producttypes konden niet geladen worden.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProductTypes();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-12">
          <h1 className="mb-15 text-3xl font-semibold tracking-tight text-slate-900">
            BrightSwagShop
          </h1>
          <p className="mb-6 text-slate-600">
            Pick a category and add items to your cart.
          </p>
        </div>
      </div>

      <div className="w-full bg-[#EDEDED] pt-20 pb-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productTypes.map((productType) => {
              const image = imageMap[productType.slug];
              const description =
                descMap[productType.slug] ??
                "Bekijk alle producten in deze categorie.";

              return (
                <Link key={productType.slug} to={`/category/${productType.slug}`}>
                  <div className="group relative overflow-hidden rounded-xl border border-[#3C3C3B] bg-white p-6 shadow-md transition hover:-translate-y-0.5 hover:border-yellow-300 hover:shadow-md">
                    <div className="flex gap-6">
                      {image && (
                        <div className="flex h-32 w-24 items-center justify-center">
                          <img
                            src={image}
                            alt={productType.name}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}

                      <div className="flex-1">
                        <h2 className="text-2xl font-semibold text-[#F4C709]">
                          {productType.name}
                        </h2>
                        <div className="my-3 h-px w-20 bg-[#3C3C3B]" />
                        <p className="text-sm text-slate-900">{description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;