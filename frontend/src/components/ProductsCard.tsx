 import React, { useContext } from 'react'
 import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FavoritesContext } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AtuhContext';

 type MaatInfo = {
  maat: string;
  stock: number;
  sku: string;
};

type KleurInfo = {
  kleur: string;
  imageUrl: string;
  maten?: MaatInfo[];
};
// beschrijft hoe een product eruitziet 
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  productType: string;
  isActive: boolean;
  imageUrl?: string;
  kleuren?: KleurInfo[];
};
const ProductsCard = () => {
     const favoritesContext = useContext(FavoritesContext);
     
     if (!favoritesContext) throw new Error("FavoritesContext missing");
     
     const { toggleFavorite, isFavorite } = favoritesContext;
     const { isAuthenticated } = useAuth();

     //haalt categorie uit de url bv. category/shoes de shoes
  const { category } = useParams<{ category: string }>();
  //geheugen van mijn pagina lijst van producten
  const [items, setItems] = useState<Product[]>([]);
  //state voor is het nog aan het laden?
  const [loading, setLoading] = useState(true);
  //state voor error 
  const [error, setError] = useState("");
    //const { toggleFavorite, isFavorite } = useFavorites();

    //kiest welke afbeelding jij toont 
  const getProductImage = (product: Product) => {
    //heeft kleuren? → pak eerste kleur image
    if (product.kleuren && product.kleuren.length > 0) {
      return product.kleuren[0].imageUrl;
    }
      //anders → gebruik product.imageUrl
    if (product.imageUrl) {
      return product.imageUrl;
    }

    return "/placeholder.png";
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");
    //       const response = await fetchWithAuth(
    //     `${import.meta.env.VITE_API_URL}/api/products/type/${category}`
    //   );

    //   const data = await response.json();
    //   setItems(data);
    // } catch (err) {
    //   console.error(err);
    //   setError("Producten konden niet geladen worden.");
    // } finally {
    //   setLoading(false);
    // }

    // haalt data van je API
        const response = await axios.get<Product[]>(
          `${import.meta.env.VITE_API_URL}/api/products/type/${category}`
        );
        //slaat producten op in state
        setItems(response.data);
      } catch (err) {
        console.error(err);
        setError("Producten konden niet geladen worden.");
      } finally {
        setLoading(false);
        //klaar met laden
      }
    };
 
       

    if (category) {
      loadProducts();
    }
  }, [category]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900">Laden...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold text-red-600">{error}</h1>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900">
          Geen producten gevonden
        </h1>
      </div>
    );
  }
  console.log("ITEMS:", items)
console.log("IDS:", items.map(i => i.id))
   return (
     <div   className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              
                {/* loop door alle producten */}
            {items.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
              >
                 
                <div className="bg-slate-50 p-6 flex justify-center">
                  {/* gebruikt je slimme image functie */}
                  <img
                    src={getProductImage(item)}
                    alt={item.name}
                    className="h-44 w-auto object-contain"
                  />
                </div>
 
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {item.name}
                  </h2>
                 

                  <p className="mt-2 text-sm text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-slate-500">
                      € {item.price.toFixed(2)}
                    </span>
                    <button
                    onClick={() => {
                        if (!isAuthenticated) {
                        toast.error("Je moet eerst inloggen");
                        return;
                        }

                        const alreadyFavorite = isFavorite(item.id);

                        toggleFavorite(item.id);

                        if (alreadyFavorite) {
                        toast("Verwijderd uit favorieten");
                        } else {
                        toast.success("Toegevoegd aan favorieten");
                        }
                    }}
                    className="text-xl"
                    >
                    {isFavorite(item.id) ? (
                        <FaHeart className="text-red-500" />
                    ) : (
                        <FaRegHeart className="text-gray-400" />
                    )}
                    </button>


                        

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
   )
 }
 
 export default ProductsCard