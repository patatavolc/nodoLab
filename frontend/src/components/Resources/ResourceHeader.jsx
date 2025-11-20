import { PlusIcon } from "@heroicons/react/24/outline";

const ResourceHeader = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white">Resource Management</h1>
                <p className="text-gray-400 mt-1 text-sm">
                    View, add, and manage all bookable spaces and equipment.
                </p>
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-sm transition-colors shadow-lg">
                <PlusIcon className="w-5 h-5 mr-2" />
                Add new Resource
            </button>
        </div>
    );
};
export default ResourceHeader;
