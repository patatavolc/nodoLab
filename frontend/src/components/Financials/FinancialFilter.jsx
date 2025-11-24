import React from "react";
import { MagnifyingGlassIcon, CalendarIcon } from "@heroicons/react/24/outline";

const FinancialFilters = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative grow md:max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                    placeholder="Search by client, invoice number..."
                />
            </div>

            {/* Filter by Status */}
            <select className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-blue-500 block p-2.5 min-w-[150px]">
                <option>Filter by Status</option>
                <option value="Pagado">Paid</option>
                <option value="Pendiente">Pending</option>
                <option value="Vencido">Overdue</option>
            </select>

            {/* Date Picker (Simulado visualmente) */}
            <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-blue-500 block p-2.5 pr-10 w-full md:w-auto"
                />
            </div>
        </div>
    );
};

export default FinancialFilters;
