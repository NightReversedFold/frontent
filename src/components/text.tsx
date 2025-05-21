import { useState } from "react";

export default function BusquedaForm() {
  const [search, setSearch] = useState('');
  const [clases, setClases] = useState(['chair']);
  const [incluyeTodos, setIncluyeTodos] = useState(true);

  const eliminarClase = (clase) => {
    setClases(clases.filter((c) => c !== clase));
  };

  const toggleIncluyeTodos = () => {
    setIncluyeTodos(!incluyeTodos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ search, clases, incluyeTodos });
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white p-10">
      <h1 className="text-4xl font-bold mb-6">busqueda</h1>
      <form onSubmit={handleSubmit} className="bg-[#1e1e23] p-6 rounded-lg space-y-6 max-w-xl">
        <div>
          <label className="block text-sm font-semibold mb-2">¿Qué buscas?</label>
          <textarea
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-4 bg-[#2b2b30] rounded-md text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600"
            rows="4"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Clase</label>
          <div className="flex flex-wrap items-center gap-2 bg-[#2b2b30] p-2 rounded-md">
            {clases.map((clase) => (
              <div
                key={clase}
                className="flex items-center bg-red-500 text-white px-3 py-1 rounded-full text-sm"
              >
                {clase}
                <button
                  type="button"
                  onClick={() => eliminarClase(clase)}
                  className="ml-2 font-bold hover:text-black"
                >
                  ×
                </button>
              </div>
            ))}
            <div className="ml-auto">
              <button
                type="button"
                className="text-white hover:text-gray-400"
                title="Añadir más (mock dropdown)"
              >
                ▼
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div
            onClick={toggleIncluyeTodos}
            className={`w-10 h-6 flex items-center rounded-full cursor-pointer ${
              incluyeTodos ? 'bg-red-500' : 'bg-gray-600'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                incluyeTodos ? 'translate-x-5' : 'translate-x-1'
              }`}
            ></div>
          </div>
          <span className="text-sm font-semibold">Incluye todos</span>
        </div>

        <button
          type="submit"
          className="bg-[#2b2b30] hover:bg-[#3a3a42] border border-white px-6 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}