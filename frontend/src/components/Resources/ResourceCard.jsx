import {
    PencilSquareIcon,
    TrashIcon,
    UserGroupIcon,
    CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

// Asigna una imagen ficticia segun el tipo de la BD
const getPlaceholderImage = (tipo) => {
    switch (tipo) {
        case "sala":
            return "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
        case "mesa":
            return "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
        case "oficina_privada":
            return "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
        default:
            return "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
    }
};

// Estilos para el estado
const getStatusBadge = (estado) => {
    switch (estado) {
        case "disponible":
            return { color: "bg-green-500", label: "Available" };
        case "ocupado":
            return { color: "bg-orange-500", label: "Booked" }; // Naranja para coincidir con la imagen
        case "mantenimiento":
            return { color: "bg-red-500", label: "Out of Service" };
        default:
            return { color: "bg-gray-500", label: "Unknown" };
    }
};

// Formateo de nombre para mostrarse
const formatType = (tipo) => {
    const map = {
        sala: "Meeting Room",
        mesa: "Hot Desk",
        oficina_privada: "Private Office",
    };
    return map[tipo] || tipo;
};

const ResourceCard = ({ resource, onDelete }) => {
    // Extraer datos de la BD
    const { id_recurso, nombre, tipo, capacidad, estado, precio_hora } = resource;

    const badge = getStatusBadge(estado);

    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 flex flex-col group">
            {/* Imagen y badge */}
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={getPlaceholderImage(tipo)}
                    alt={nombre}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                {/* Badge */}
                <div
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm ${badge.color}`}
                >
                    {badge.label}
                </div>
            </div>
            {/* Cuerpo de la tarjeta */}
            <div className="p-5 grow">
                <h3 className="text-lg font-bold text-white mb-1">{nombre}</h3>
                <p className="text-sm text-gray-400 mb-4">{formatType(tipo)}</p>

                {/* Caracteristicas */}
                <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                    {/* Icono de capacidad */}
                    <div className="flex items-center gap-1.5">
                        <UserGroupIcon className="w-4 h-4" />
                        <span>{capacidad}</span>
                    </div>

                    {/* Icono precio */}
                    <div className="flex items-center gap-1.5">
                        <CurrencyDollarIcon className="w-4 h-4" />
                        <span>{precio_hora}/h</span>
                    </div>

                    {/* Si es una sala, simulamos visuales */}
                    {tipo === "sala" && (
                        <span className="text-xs text-gray-500 border border-gray-700 px-1 rounded">
                            TV
                        </span>
                    )}
                    {tipo === "sala" && (
                        <span className="text-xs text-gray-500 border border-gray-700 px-1 rounded">
                            Wifi
                        </span>
                    )}
                </div>
            </div>

            {/* Acciones */}
            <div className="flex border-t border-gray-700">
                <button className="flex-1 py-3 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors text-sm font-medium border-r border-gray-700">
                    <PencilSquareIcon className="w-4 h-4 mr-2" />
                    Edit
                </button>
                <button
                    onClick={() => onDelete(id_recurso)}
                    className="flex-1 py-3 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-gray-700/20 transition-colors text-sm font-medium"
                >
                    <TrashIcon className="w-4 h-4 mr-2" />
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ResourceCard;
