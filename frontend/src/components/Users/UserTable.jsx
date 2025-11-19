import {
    PencilSquareIcon,
    TrashIcon,
    LinkIcon,
    UserPlusIcon,
    EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";

// Controles de estado
const getStatusStyles = (status) => {
    switch (status.toLoweCase()) {
        case "active":
            return "bg-green-500/10 text-green-500 border border-green-500/20";
        case "inactive":
            return "bg-gray-500/10 text-gray-400 border border-gray-500/20";
        case "pending":
            return "bg-orange-500/10 text-orange-500 border border-orange-500/20";
        default:
            return "bg-gray-700 text-gray-300";
    }
};

const UserTable = ({ users, selectedUserIds, onSelectUser, onSelectAll, onDelete }) => {
    const isAllSelected = users.length > 0 && selectedUserIds.length === users.length;

    return (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
            {/* Barra de Acciones Masivas (Solo visible si hay selección) */}
            {selectedUserIds.length > 0 && (
                <div className="bg-blue-900/30 border-b border-blue-800 p-4 flex justify-between items-center animate-fade-in">
                    <div className="text-blue-100 text-sm font-medium">
                        {selectedUserIds.length} users selected
                    </div>
                    <div className="flex space-x-4">
                        <button
                            className="text-blue-200 hover:text-white transition-colors"
                            title="Manage Roles"
                        >
                            <UserPlusIcon className="w-5 h-5" />
                        </button>
                        <button
                            className="text-blue-200 hover:text-white transition-colors"
                            title="Toggle Status"
                        >
                            <LinkIcon className="w-5 h-5" />
                        </button>
                        <button
                            className="text-red-300 hover:text-red-100 transition-colors"
                            title="Delete Selected"
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="bg-gray-900/50 text-left">
                            <th className="p-4 w-10">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                                    checked={isAllSelected}
                                    onChange={onSelectAll}
                                />
                            </th>
                            <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                                User
                            </th>
                            <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="hover:bg-gray-700/50 transition-colors group"
                            >
                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                                        checked={selectedUserIds.includes(user.id)}
                                        onChange={() => onSelectUser(user.id)}
                                    />
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center">
                                        {/* Avatar: Usa imagen si existe, sino iniciales */}
                                        {user.avatar ? (
                                            <img
                                                className="h-10 w-10 rounded-full object-cover"
                                                src={user.avatar}
                                                alt=""
                                            />
                                        ) : (
                                            <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                        )}
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-white">
                                                {user.name}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="text-sm text-gray-300">{user.role}</div>
                                </td>
                                <td className="p-4">
                                    <span
                                        className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(
                                            user.status
                                        )}`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-3 opacity-80 group-hover:opacity-100 transition-opacity">
                                        <button className="text-gray-400 hover:text-white transition-colors">
                                            <PencilSquareIcon className="w-5 h-5" />
                                        </button>
                                        <button className="text-gray-400 hover:text-white transition-colors">
                                            {/* Icono simulando el toggle switch de la imagen */}
                                            <LinkIcon className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(user.id)}
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

            {/* Empty State si no hay usuarios */}
            {users.length === 0 && (
                <div className="p-8 text-center text-gray-400">
                    No users found matching your criteria.
                </div>
            )}
        </div>
    );
};
export default UserTable;
