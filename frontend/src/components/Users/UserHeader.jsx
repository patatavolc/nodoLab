import { PlusIcon } from "@heroicons/react/24/solid";

const UserHeader = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white">User Managment</h1>
                <p className="text-gray-400 mt-1">Manage user acounts, roles, and permissions.</p>
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
                <PlusIcon className="w-5 h-5 mr-2" />
                Create New User
            </button>
        </div>
    );
};

export default UserHeader;
