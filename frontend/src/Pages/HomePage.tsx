import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getApiBaseUrl } from "../Config/apiBaseUrl";

import Loading from "../components/Loading";
import ErrorComponent from "../components/ErrorComponent";

import Bottle from "../assets/producttypes/Bottle_Dopper_Yellow.png";
import Carton from "../assets/producttypes/Carton_Basic_White.png";
import Duck from "../assets/producttypes/Duck_Scared.png";
import Hoodie from "../assets/producttypes/Hoodie_Basic_Gray.png";
import Mug from "../assets/producttypes/Mug_Basic_Yellow.png";
import Pants from "../assets/producttypes/Pants_Sport_White.png";
import Pen from "../assets/producttypes/Pen_Basic_White.png";
import Socks from "../assets/producttypes/Socks_Basic_Yellow.png";
import TShirt from "../assets/producttypes/T-shirt_Baggy_Black.png";

type ProductTypeMeta = {
  image: string;
  description: string;
};

type ProductType = {
  name: string;
  slug: string;
};

const productTypeMeta: Record<string, ProductTypeMeta> = {
  tshirt: {
    image: TShirt,
    description: "Comfortabele T-shirts voor dagelijks gebruik en events.",
  },
  "t-shirt": {
    image: TShirt,
    description: "Comfortabele T-shirts voor dagelijks gebruik en events.",
  },
  hoodie: {
    image: Hoodie,
    description: "Warme hoodies met een zachte pasvorm en een casual look.",
  },
  sportkledij: {
    image: Pants,
    description: "Sportieve kleding voor comfortabele beweging en training.",
  },
  sokken: {
    image: Socks,
    description: "Leuke sokken voor elke dag, handig als klein cadeau.",
  },
  drinkfles: {
    image: Bottle,
    description: "Herbruikbare drinkflessen voor school, werk en onderweg.",
  },
  mok: {
    image: Mug,
    description: "Bedrukte mokken voor koffie, thee en een gezellige werkplek.",
  },
  onderlegger: {
    image: Carton,
    description: "Handige onderleggers voor op bureau, tafel of werkplek.",
  },
  balpen: {
    image: Pen,
    description: "Praktische balpennen voor notities, meetings en giveaways.",
  },
  eendje: {
    image: Duck,
    description: "Speelse eendjes voor een opvallend en leuk accessoire.",
  },
};

const getProductTypeMeta = (slug: string, name: string) => {
  const normalizedSlug = slug.trim().toLowerCase();
  const normalizedName = name.trim().toLowerCase().replace(/\s+/g, "-");

  return (
    productTypeMeta[normalizedSlug] ??
    productTypeMeta[normalizedName] ?? {
      image: TShirt,
      description: "Bekijk alle producten in deze categorie.",
    }
  );
};

const HomePage = () => {
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProductTypes = async () => {
      try {
        const response = await axios.get<ProductType[]>(
          `${getApiBaseUrl()}/api/producttypes`,
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
    return <ErrorComponent description={error} />;
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
              const meta = getProductTypeMeta(
                productType.slug,
                productType.name,
              );

              return (
                <Link
                  key={productType.slug}
                  to={`/category/${productType.slug}`}
                >
                  <div className="group relative overflow-hidden rounded-xl border border-[#3C3C3B] bg-white p-6 shadow-md transition hover:-translate-y-0.5 hover:border-yellow-300 hover:shadow-md">
                    <div className="flex gap-6">
                      <div className="flex h-32 w-24 items-center justify-center">
                        <img
                          src={meta.image}
                          alt={productType.name}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="flex-1">
                        <h2 className="text-2xl font-semibold text-[#F4C709]">
                          {productType.name}
                        </h2>
                        <div className="my-3 h-px w-20 bg-[#3C3C3B]" />
                        <p className="text-sm text-slate-900">
                          {meta.description}
                        </p>
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
