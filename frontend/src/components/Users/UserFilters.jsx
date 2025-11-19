import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const UserFilters = ({
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFIlter,
}) => {
    return (
        <div className="flex flex-col md:flex-row justify-between gap-4">
            {/* Barra de busqueda */}
            <div className="relative grow md:max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 border border-gray-700 rounded-lg leading-5 bg-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Dropdowns de filtro */}
            <div className="flex gap-4">
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-700 bg-gray-800 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                >
                    <option value="All">Role: All</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Community Manager">Community Manager</option>
                    <option value="Member">Member</option>
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFIlter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-700 bg-gray-800 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                >
                    <option value="All">Status: All</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>
        </div>
    );
};

export default UserFilters;
