/*
    La estructura de datos que tiene que devolver el backend tiene que ser algo asi

    [
  {
    "id": 1,
    "name": "Amelia Garcia",
    "email": "amelia.garcia@example.com",
    "role": "Administrator",
    "status": "Active",
    "avatar": "https://i.pravatar.cc/150?u=amelia" 
  },
  {
    "id": 2,
    "name": "Benjamin Carter",
    "email": "ben.carter@example.com",
    "role": "Community Manager",
    "status": "Active",
    "avatar": "https://i.pravatar.cc/150?u=benjamin"
  },
  {
    "id": 3,
    "name": "Chloe Davis",
    "email": "chloe.davis@example.com",
    "role": "Member",
    "status": "Inactive",
    "avatar": "https://i.pravatar.cc/150?u=chloe"
  },
  {
    "id": 4,
    "name": "David Evans",
    "email": "david.evans@example.com",
    "role": "Member",
    "status": "Pending",
    "avatar": "https://i.pravatar.cc/150?u=david"
  }
]
*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import UserHeader from "../components/users/UserHeader";
import UserFilters from "../components/users/UserFilters";
import UserTable from "../components/users/UserTable";

// Endpoint del backend (a cambiar)
const API_URL = "http://localhost:3000/api/users";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados para filtros
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    // Estado para selección múltiple (Checkboxes)
    const [selectedUserIds, setSelectedUserIds] = useState([]);

    // Función para cargar usuarios (con filtros aplicados en el backend o frontend)
    const fetchUsers = async () => {
        setLoading(true);
        try {
            // Enviaremos los filtros como query params al backend
            const params = {
                search: searchTerm,
                role: roleFilter !== "All" ? roleFilter : undefined,
                status: statusFilter !== "All" ? statusFilter : undefined,
            };

            const response = await axios.get(API_URL, { params });
            setUsers(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching users:", err);
            setError("Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    // Re-cargar cuando cambien los filtros
    // Debounce recomendado para búsqueda en producción, aquí simplificado
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchUsers();
        }, 300); // Pequeño retraso para no saturar la API mientras escribes

        return () => clearTimeout(delayDebounce);
    }, [searchTerm, roleFilter, statusFilter]);

    // Manejadores de acciones
    const handleDeleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchUsers(); // Recargar lista
                // Limpiar selección si el usuario borrado estaba seleccionado
                setSelectedUserIds((prev) => prev.filter((userId) => userId !== id));
            } catch (error) {
                alert("Error deleting user");
            }
        }
    };

    // Manejo de checkboxes
    const handleSelectUser = (id) => {
        if (selectedUserIds.includes(id)) {
            setSelectedUserIds(selectedUserIds.filter((userId) => userId !== id));
        } else {
            setSelectedUserIds([...selectedUserIds, id]);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = users.map((u) => u.id);
            setSelectedUserIds(allIds);
        } else {
            setSelectedUserIds([]);
        }
    };

    if (loading && users.length === 0)
        return <div className="p-8 text-white">Loading users...</div>;
    if (error) return <div className="p-8 text-red-400">{error}</div>;

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <UserHeader />

            <div className="mt-6">
                <UserFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    roleFilter={roleFilter}
                    setRoleFilter={setRoleFilter}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                />
            </div>

            <div className="mt-6">
                <UserTable
                    users={users}
                    selectedUserIds={selectedUserIds}
                    onSelectUser={handleSelectUser}
                    onSelectAll={handleSelectAll}
                    onDelete={handleDeleteUser}
                />
            </div>
        </div>
    );
};

export default Users;
