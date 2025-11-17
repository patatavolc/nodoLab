import React from "react";
import { PlusIcon, DocumentArrowDownIcon } from "@heroicons/react";

const Header = ({ userName, appName }) => {
  <>
    <h1 className="text-3xl font-semibold text-white">Welcome back, {userName}</h1>
    <p className="mt-1 text-gray-400">Here's a snapshot of what's happening at {appName}</p>

    <div className="mt-6 flex justify-end space-x-3">
      <button className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-gray-700 hover:bg-gray-600 transition-colors">
        <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
        Generate Report
      </button>
      <button className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition-colors">
        <PlusIcon w-5 h-5 mr-2 />
        New Booking
      </button>
    </div>
  </>;
};

export default Header;
