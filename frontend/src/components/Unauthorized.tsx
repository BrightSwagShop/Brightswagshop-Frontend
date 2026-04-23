import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col bg-gray-100">

      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-200 text-center px-6">
        <h1 className="text-5xl font-semibold mb-4">
          Geen toegang
        </h1>

        <p className="text-gray-600 mb-8 max-w-md">
          Je hebt geen toestemming om deze pagina te bekijken.
          Log in met een account dat toegang heeft of ga terug naar de shop.
        </p>

        <div className="flex gap-4">
          <Link
            to="/"
            className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-lg text-sm font-medium transition"
          >
            Verder shoppen
          </Link>

          <Link
            to="/login"
            className="border border-yellow-400 px-6 py-3 rounded-lg text-sm font-medium hover:bg-yellow-50 transition"
          >
            Inloggen
          </Link>
        </div>

      </div>
    </div>
  );
}
export default Unauthorized