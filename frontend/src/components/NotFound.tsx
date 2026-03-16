import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Main */}
      <div className="flex flex-col items-center justify-center flex-1 bg-gray-200 text-center px-6">
        <h1 className="text-5xl font-semibold mb-4">
          Pagina niet gevonden
        </h1>

        <p className="text-gray-600 mb-8 max-w-md">
          Deze pagina bestaat niet of werd verplaatst.  
          Ga terug naar de shop om verder te winkelen.
        </p>

        <Link
          to="/"
          className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-lg text-sm font-medium transition"
        >
          Verder shoppen
        </Link>

      </div>
    </div>
  );
}

export default NotFound