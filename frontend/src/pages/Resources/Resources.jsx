import React, { useState, useEffect } from "react";
import axios from "axios";
import ResourceHeader from "../../components/Resources/ResourceHeader";
import ResourceFilters from "../../components/Resources/ResourceFilters";
import ResourceGrid from "../../components/Resources/ResourceGrid";

// Endpoint de a API
const API_URL = "http://localhost:3000/api/recursos";

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estados de los filtros (valores iniciales coinciden con la logica de "Todos")
    const [search, setSearch] = useState("");
    const [type, setType] = useState("All");
    const [status, setStatus] = useState("All");

    // Funcion para obtener datos
    const fetchResources = async () => {
        setLoading(true);
        try {
            // Mapear los filtros a los parametros que se esperan
            const params = {
                search: search,
                // Si es 'All', enviamos undefined para que el backend ignore el filtro
                tipo: type !== "All" ? type : undefined,
                estado: status !== "All" ? status : undefined,
            };

            const response = await axios.get(API_URL, { params });
            setResources(response.data);
        } catch (err) {
            console.log("Error cargando recursos:", err);
        } finally {
            setLoading(false);
        }
    };

    // Recargar cuando cambian los filtros (pequeño delay para no saturar)
    useEffect(() => {
        const timer = setTimeout(() => fetchResources(), 300);
        return () => clearTimeout(timer);
    }, [search, type, status]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this resource?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchResources(); // Recargar tras borrar
            } catch (e) {
                alert("Error deleting resource. Check if it has active bookings.");
            }
        }
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <ResourceHeader />

            <div className="mt-8">
                <ResourceFilters
                    search={search}
                    setSearch={setSearch}
                    type={type}
                    setType={setType}
                    status={status}
                    setStatus={setStatus}
                />
            </div>

            <div className="mt-6">
                {loading ? (
                    <p className="text-gray-400">Loading resources...</p>
                ) : (
                    <ResourceGrid resources={resources} onDelete={handleDelete} />
                )}
            </div>
        </div>
    );
};
export default Resources;
