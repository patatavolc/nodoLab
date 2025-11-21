const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }.format(value));
};

// Formatear el ID de la factura (ej: 123 -> INV-00123)
const formatInvoiceId = (id) => `INV-${String(id).padStart(5, "0")}`;

const getStatusStyle = (estado) => {
    switch (estado) {
        case "Pagado":
            return "bg-green-500/20 text-green-500 border border-green-500/30";
        case "Pendiente":
            return "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30";
        case "Vencido":
            return "bg-red-500/20 text-red-500 border border-red-500/30";
        default:
            return "bg-gray-700 text-gray-400";
    }
};

const InvoiceTable = ({ invoices, loading }) => {
    if (loading) return <div className="p-4 text-gray-400">Cargando facturas...</div>;

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg h-full">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                        <tr className="bg-gray-900/50 text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-700">
                            <th className="p-4">Factura #</th>
                            <th className="p-4">Cliente</th>
                            <th className="p-4">Emisión</th>
                            <th className="p-4">Vencimiento</th>
                            <th className="p-4">Monto</th>
                            <th className="p-4">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 text-sm">
                        {invoices.map((invoice) => (
                            <tr
                                key={invoice.id_factura}
                                className="hover:bg-gray-700/30 transition-colors"
                            >
                                <td className="p-4 font-medium text-white">
                                    {formatInvoiceId(invoice.id_factura)}
                                </td>
                                <td className="p-4 text-gray-300">
                                    {/* nombre_completo viene de la tabla usuarios */}
                                    <div className="font-medium text-white">
                                        {invoice.nombre_completo}
                                    </div>
                                </td>
                                <td className="p-4 text-gray-400">{invoice.fecha_factura}</td>
                                {/* fecha_vencimiento debe ser calculada por el backend (ej: fecha_factura + 15 dias) */}
                                <td className="p-4 text-gray-400">{invoice.fecha_vencimiento}</td>
                                <td className="p-4 text-gray-300 font-medium">
                                    {/* Usamos total_bruto de tu tabla facturas */}
                                    {formatCurrency(invoice.total_bruto)}
                                </td>
                                <td className="p-4">
                                    <span
                                        className={`px-2.5 py-0.5 rounded text-xs font-semibold ${getStatusStyle(
                                            invoice.estado_calculado
                                        )}`}
                                    >
                                        {invoice.estado_calculado}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Paginación */}
            <div className="p-4 border-t border-gray-700 flex justify-between items-center text-xs text-gray-400">
                <span>Mostrando 1-4 de 100</span>
                <div className="flex gap-1">
                    <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition">
                        Anterior
                    </button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
                    <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition">
                        2
                    </button>
                    <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition">
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
};
export default InvoiceTable;