import React from "react";
import { Link } from "react-router-dom";

// ✅ Zet je brand images in: src/assets/brands/
import brand1 from "../assets/brands/vlegel.png";
import brand2 from "../assets/brands/yonderland.png";
import brand3 from "../assets/brands/xfa.png";
import brand4 from "../assets/brands/gps.png";
import brand5 from "../assets/brands/pointerpro.png";
import brand6 from "../assets/brands/yo.png";

const About: React.FC = () => {
  const brands = [
    { src: brand1, alt: "Vlegel Technology" },
    { src: brand2, alt: "Yonderland" },
    { src: brand3, alt: "XFA" },
    { src: brand4, alt: "GPS" },
    { src: brand5, alt: "Pointerpro" },
    { src: brand6, alt: "YO" },
  ];

  return (
    <main className="w-full">
      {/* HERO */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 leading-tight">
              Brightest
              <br />
              SwagShop
            </h1>

            <p className="mt-6 text-sm md:text-base text-gray-600 leading-relaxed">
              Een fake webshop waar klanten Brightest promo merchandise kunnen kopen. Deze
              webshop heeft onzettelijk bugs ingebouwd die aan een uitgetest kunnen worden
              door een admin. Dit laat toe om test automation te laten zien op objecten die
              zich niet goed gedragen om zo de kracht van test automation te demonstreren.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center h-10 px-8 rounded-md bg-[#F4C709] text-gray-900 font-medium text-sm hover:opacity-90 transition"
              >
                Shop
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center h-10 px-8 rounded-md border border-[#F4C709] text-[#F4C709] font-medium text-sm hover:bg-[#F4C709] hover:text-gray-900 transition"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* gele boog rechts (deco) */}
          <div className="hidden md:block absolute right-10 bottom-10">
           <div className="w-48 h-48 rounded-full border-[28px] border-[#F4C709] border-r-transparent border-b-transparent rotate-[20deg]" />
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="w-full bg-[#3f3f3f]">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
            {brands.map((b) => (
              <div
                key={b.alt}
                className="w-[300px] h-[150px] bg-white rounded-2xl shadow-lg flex items-center justify-center"
              >
                <img
                  src={b.src}
                  alt={b.alt}
                  className="max-h-40 max-w-[180px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;