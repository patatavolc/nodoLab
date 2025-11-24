import React from "react";

const FinancialHeader = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white">Financial Management</h1>
                {/* Subtítulo opcional si quieres igualar el estilo de las otras páginas */}
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-lg shadow-blue-900/20">
                Generate New Invoice
            </button>
        </div>
    );
};

export default FinancialHeader;
