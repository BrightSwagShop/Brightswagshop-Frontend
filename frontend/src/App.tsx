import './App.css'

const App = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 max-w-sm bg-white rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Tailwind Test
        </h1>
        <p className="text-gray-600">
          Als je dit mooi gestyled ziet, werkt Tailwind correct 🎉
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Klik mij
        </button>
      </div>
    </div>
  )
}

export default App
