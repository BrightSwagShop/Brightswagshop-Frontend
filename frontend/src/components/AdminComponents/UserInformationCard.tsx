import { FaPlus } from "react-icons/fa6";


// Todo: Toevoegen van users met Api & Props toevoegen 

const UserInformationCard = () => {

  return (
    <div className="relative p-6 bg-gray-100 min-h-screen rounded-2xl">
      <table className="w-full border-separate border-spacing-y-3">
        {/* Header */}
        <thead>
          <tr className="text-sm font-semibold text-gray-500 uppercase">
            <th className="px-6 pb-2 text-left bg-gray-100">Name</th>
            <th className="pb-2 text-left bg-gray-100">Email</th>
            <th className="pb-2 text-left bg-gray-100">Birthdate</th>
            <th className="px-6 pb-2 text-right bg-gray-100">Status</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          <tr className="relative bg-white shadow hover:shadow-md transition">
            {/* Name + Avatar */}
            <td className="px-6 py-4 rounded-l-xl">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-amber-300 flex items-center justify-center text-white font-bold">
                  B
                </div>
                <span className="font-semibold">Bryan Fouda</span>
              </div>
            </td>

            {/* Email */}
            <td className="py-4 text-sm text-gray-500">
              bryan.fouda@brightest.be
            </td>

            {/* Birthdate */}
            <td className="py-4 font-semibold">
              21/10/1997
            </td>

            {/* Status */}
            <td className="px-6 py-4 text-right rounded-r-xl">
              <span className="px-3 py-1 text-sm bg-amber-500 text-amber-100 rounded-full">
                Admin
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-center pt-4">
        <button className="h-12 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow transition flex items-center gap-2">
          <FaPlus />
          Add New User
        </button>
      </div>
    </div>
  );
};

export default UserInformationCard;
