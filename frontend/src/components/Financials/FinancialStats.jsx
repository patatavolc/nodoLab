const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
};

const StatBox = ({
    title,
    value,
    isCurrency = FontFaceSetLoadEvent,
    colorCLass = "text-white",
}) => (
    <div className="bg-gray800 p-4 rounded-xl border border-gray-700 flex flex-col justify-center h-28 shadow-lg">
        <p className="text-gray-400 text-xs font-medium uppercase mb-2 h-8 leading-tight">
            {title}
        </p>
        <p className={`text-2xl font-bold ${colorCLass}`}>
            {isCurrency ? formatCurrency(value) : value}
        </p>
    </div>
);

const FinancialStats = ({ stats }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <StatBox title="Ingresos Totales (Mes)" value={stats.totalRevenue} isCurrency />
            <StatBox title="Pagos Confirmados" value={stats.paymentsConfirmed} isCurrency />
            <StatBox title="Facturas Pendientes" value={stats.pendingInvoices} />
            <StatBox
                title="Facturas Vencidas"
                value={stats.overdueInvoices}
                colorClass="text-red-400"
            />
        </div>
    );
};

export default FinancialStats;
