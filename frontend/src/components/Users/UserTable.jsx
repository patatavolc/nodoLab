import React from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const UserTable = ({ users, selectedUserIds, onSelectUser, onSelectAll, onDelete }) => {
    const isAllSelected = users.length > 0 && selectedUserIds.length === users.length;

    return (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
            {/* Barra de selección */}
            {selectedUserIds.length > 0 && (
                <div className="bg-blue-900/30 border-b border-blue-800 p-4 flex justify-between items-center">
                    <div className="text-blue-100 text-sm font-medium">
                        {selectedUserIds.length} usuarios seleccionados
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="bg-gray-900/50 text-left">
                            <th className="p-4 w-10">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-600 bg-gray-700 text-blue-600"
                                    checked={isAllSelected}
                                    onChange={onSelectAll}
                                />
                            </th>
                            <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Usuario (DNI)
                            </th>
                            <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Contacto
                            </th>
                            <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Rol
                            </th>
                            <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {users.map((user) => (
                            <tr
                                key={user.id_usuario_dni}
                                className="hover:bg-gray-700/50 transition-colors group"
                            >
                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-600 bg-gray-700 text-blue-600"
                                        checked={selectedUserIds.includes(user.id_usuario_dni)}
                                        onChange={() => onSelectUser(user.id_usuario_dni)}
                                    />
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center">
                                        {/* Generador de Avatar basado en Iniciales */}
                                        <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold uppercase">
                                            {user.nombre_completo
                                                ? user.nombre_completo.charAt(0)
                                                : "?"}
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-white">
                                                {user.nombre_completo}
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                DNI: {user.id_usuario_dni}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                @{user.username}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="text-sm text-gray-300">{user.email}</div>
                                    <div className="text-xs text-gray-500">
                                        {user.telefono || "Sin teléfono"}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span
                                        className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                        user.rol === "admin"
                            ? "bg-purple-500/10 text-purple-500 border border-purple-500/20"
                            : user.rol === "empleado"
                            ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                            : "bg-green-500/10 text-green-500 border border-green-500/20"
                    }`}
                                    >
                                        {user.rol}
                                    </span>
                                </td>
                                <td className="p-4 text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-3">
                                        <button className="text-gray-400 hover:text-white transition-colors">
                                            <PencilSquareIcon className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(user.id_usuario_dni)}
                                            className="text-gray-400 hover:text-red-400 transition-colors"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
