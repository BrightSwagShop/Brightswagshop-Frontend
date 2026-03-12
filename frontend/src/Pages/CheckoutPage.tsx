// src/Pages/CheckoutPage.tsx
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 pb-24 pt-16">
        <div className="mx-auto w-full max-w-xl">
          {/* Form */}
          <div className="space-y-6">

            {/* Voornaam + Achternaam */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold text-gray-700">
                  Voornaam <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  data-testid="checkout-firstname-input"
                  className="h-10 w-full rounded-md border border-gray-400 px-3 text-sm outline-none focus:border-[#F4C709]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-gray-700">
                  Achternaam <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  data-testid="checkout-lastname-input"
                  className="h-10 w-full rounded-md border border-gray-400 px-3 text-sm outline-none focus:border-[#F4C709]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                data-testid="checkout-email-input"
                className="h-10 w-full rounded-md border border-gray-400 px-3 text-sm outline-none focus:border-[#F4C709]"
              />
            </div>

            {/* Adres */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-700">
                Adres <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                data-testid="checkout-address-input"
                className="h-10 w-full rounded-md border border-gray-400 px-3 text-sm outline-none focus:border-[#F4C709]"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="my-12 h-px w-full bg-gray-300" />

          {/* Buttons */}
          <div className="flex items-center justify-between">

            <Link
              to="/"
              data-testid="checkout-continue-shopping"
              className="rounded-md border border-[#F4C709] bg-white px-8 py-2 text-xs font-semibold text-[#F4C709] transition-all duration-200 ease-in-out hover:scale-[1.02]"
            >
              Verder winkelen
            </Link>

            <button
              type="button"
              data-testid="checkout-pay-button"
              className="rounded-md bg-[#F4C709] px-10 py-2 text-xs font-semibold text-[#3C3C3B] transition-all duration-200 ease-in-out hover:scale-[1.02] hover:bg-yellow-400 cursor-pointer"
            >
              Afrekenen
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;