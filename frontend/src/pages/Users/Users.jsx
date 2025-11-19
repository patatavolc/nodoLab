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
import UserHeader from "../../components/Users/UserHeader.jsx";
import UserFilters from "../../components/Users/UserFilters.jsx";
import UserTable from "../../components/Users/UserTable.jsx";

const API_URL = "http://localhost:3000/api/usuarios";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filtros (Eliminado Status porque no existe en la BD)
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");

    const [selectedUserIds, setSelectedUserIds] = useState([]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const params = {
                search: searchTerm,
                rol: roleFilter !== "All" ? roleFilter : undefined, // Mapeo al campo 'rol' de la BD
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

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchUsers();
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm, roleFilter]);

    const handleDeleteUser = async (dni) => {
        if (window.confirm(`¿Estás seguro de eliminar al usuario con DNI ${dni}?`)) {
            try {
                // Usamos id_usuario_dni para borrar
                await axios.delete(`${API_URL}/${dni}`);
                fetchUsers();
                setSelectedUserIds((prev) => prev.filter((id) => id !== dni));
            } catch (error) {
                alert("Error eliminando usuario. Puede tener reservas asociadas.");
            }
        }
    };

    const handleSelectUser = (dni) => {
        if (selectedUserIds.includes(dni)) {
            setSelectedUserIds(selectedUserIds.filter((id) => id !== dni));
        } else {
            setSelectedUserIds([...selectedUserIds, dni]);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            // Mapeamos usando id_usuario_dni
            const allIds = users.map((u) => u.id_usuario_dni);
            setSelectedUserIds(allIds);
        } else {
            setSelectedUserIds([]);
        }
    };

    if (loading && users.length === 0)
        return <div className="p-8 text-white">Cargando usuarios...</div>;
    if (error) return <div className="p-8 text-red-400">{error}</div>;

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <UserHeader />

            <div className="mt-6">
                {/* UserFilters modificado para quitar Status */}
                <UserFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    roleFilter={roleFilter}
                    setRoleFilter={setRoleFilter}
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
