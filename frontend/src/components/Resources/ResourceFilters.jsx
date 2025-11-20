import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const ResourceFilters = ({ search, setSearch, type, setType, status, setStatus }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-6">
            {/* Barra de Búsqueda Oscura */}
            <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Dropdowns de Filtro */}
            <div className="flex w-full md:w-auto gap-3">
                {/* Filtro de TIPO (Mapeado a BD) */}
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                >
                    <option value="All">Type: All</option>
                    <option value="sala">Meeting Room</option>
                    <option value="mesa">Hot Desk</option>
                    <option value="oficina_privada">Private Office</option>
                </select>

                {/* Filtro de ESTADO (Mapeado a BD) */}
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                >
                    <option value="All">Status: All</option>
                    <option value="disponible">Available</option>
                    <option value="ocupado">Booked</option>
                    <option value="mantenimiento">Out of Service</option>
                </select>
            </div>
        </div>
    );
};
export default ResourceFilters;
