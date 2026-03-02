import shirt from "../assets/t-shirts/t-shirt1.png"; // vervang door jouw image
import { FaRegTrashAlt } from "react-icons/fa";

const WinkelwagenPage = () => {
  return (
    <div className="min-h-screen">

      <div className="max-w-4xl mx-auto pt-20 pb-20">

        {/* Products */}
        <div className="space-y-8 shado">

          {/* Product 1 */}
          <div className="flex items-center justify-between bg-white border rounded-md shadow-xl p-6 ">

            <div className="flex items-center gap-6">
              <img src={shirt} className="w-16" />

              <div>
                <p className="text-yellow-500 font-semibold">
                  Classic Tee
                </p>

                <p className="text-gray-500 text-xs mt-2">
                  Comfortable T-shirts met jouw branding.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">

              <select className="border border-yellow-500 rounded px-2 py-1 text-sm">
                <option>1</option>
              </select>

              <button className="text-gray-500 text-lg cursor-pointer hover:text-yellow-500 transition-colors duration-200">
                <FaRegTrashAlt />
              </button>

              <p className="font-semibold">
                €19,99
              </p>

            </div>
          </div>


          {/* Product 2 */}
          <div className="flex items-center justify-between bg-white border rounded-md shadow-xl p-6 ">

            <div className="flex items-center gap-6">
              <img src={shirt} className="w-16" />

              <div>
                <p className="text-yellow-500 font-semibold">
                  Classic Tee
                </p>

                <p className="text-gray-500 text-xs mt-2">
                  Comfortable T-shirts met jouw branding.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">

              <select className="border border-yellow-500 rounded px-2 py-1 text-sm">
                <option>1</option>
              </select>

              <button className="text-gray-500 text-lg cursor-pointer hover:text-yellow-500 transition-colors duration-200">
                <FaRegTrashAlt />
              </button>


              <p className="font-semibold">
                €19,99
              </p>

            </div>
          </div>


          {/* Product 3 */}
          <div className="flex items-center justify-between bg-white border rounded-md shadow-xl p-6 ">

            <div className="flex items-center gap-6">
              <img src={shirt} className="w-16" />

              <div>
                <p className="text-yellow-500 font-semibold">
                  Classic Tee
                </p>

                <p className="text-gray-500 text-xs mt-2">
                  Comfortable T-shirts met jouw branding.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">

              <select className="border border-yellow-500 rounded px-2 py-1 text-sm">
                <option>1</option>
              </select>

              <button className="text-gray-500 text-lg cursor-pointer hover:text-yellow-500 transition-colors duration-200">
                <FaRegTrashAlt />
              </button>


              <p className="font-semibold">
                €19,99
              </p>

            </div>
          </div>

        </div>


        {/* Total */}
        <div className="flex justify-end mt-10">

          <div className="text-right">

            <p className="text-sm text-gray-600">
              Totaal bedrag:
            </p>

            <p className="font-semibold text-lg">
              €59,97
            </p>

          </div>

        </div>


        {/* Buttons */}
        <div className="flex justify-between mt-12">

          <button className="border border-yellow-500 text-yellow-500 px-6 py-2 rounded-md hover:scale-105 transition cursor-pointer">
            Verder winkelen
          </button>

          <button className="bg-yellow-500 text-white px-10 py-2 rounded-md hover:bg-yellow-400 hover:scale-105 transition cursor-pointer">
            Afrekenen
          </button>

        </div>


      </div>
    </div>
  );
};



export default WinkelwagenPage;