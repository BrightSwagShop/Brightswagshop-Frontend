import { useEffect, useState } from "react";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { getUsers, type User } from "../../services/getUsers";


const GebruikersPagina = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (e) {
        console.error("Failed to load users", e);
      }
    };

    load();
  }, []);

  return (
    <div className="p-6 bg-[#EDEDED] min-h-screen">
      <h1 className="text-4xl font-semibold text-[#3C3C3B]">Gebruikers</h1>
      <p className="text-[#3C3C3B] mt-1 mb-6">
        Overzicht van huidige gebruikers
      </p>

      <div className="grid grid-cols-4 gap-6">
        {/* LEFT */}
        <div className="col-span-3 bg-white rounded-2xl overflow-hidden">
          {/* FILTER */}
          <div className="flex gap-3 p-4">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded">
              <FiSearch />
              <input
                placeholder="Zoek gebruikers..."
                className="bg-transparent outline-none"
              />
            </div>

            <select className="bg-gray-100 px-3 py-2 rounded">
              <option>Alle rollen</option>
            </select>

            <select className="bg-gray-100 px-3 py-2 rounded">
              <option>Sorteren op</option>
            </select>
          </div>

          {/* HEADER */}
          <div className="grid grid-cols-4 px-6 py-3 bg-gray-100 text-sm text-gray-600">
            <span>Naam</span>
            <span>Email</span>
            <span>Rol</span>
            <span>Acties</span>
          </div>

          {/* ROWS */}
          {users.map((u) => (
            <div
              key={u.id}
              className="grid grid-cols-4 px-6 py-4 border-t items-center"
            >
              <span>{u.name}</span>
              <span>{u.email}</span>
              <span>{u.role}</span>
              <FiTrash2 className="cursor-pointer text-gray-500 hover:text-red-500" />
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-2xl p-4 h-fit">
          <h3 className="font-semibold mb-3">Gebruiker toevoegen</h3>
            <p>Naam</p>
          <input
            placeholder="Naam"
            className="w-full border p-2 rounded mb-3"
          />
            <p> Email</p>
          <input
            placeholder="Email"
            className="w-full border p-2 rounded mb-4"
          />

          <button className="w-full bg-yellow-400 py-2 rounded-xl font-semibold">
            Nieuwe Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default GebruikersPagina;