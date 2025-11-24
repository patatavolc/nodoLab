import React from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts";

const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
};

const RevenueChart = ({ data, currentTotal = 0, previousTotal = 0 }) => {
    // 1. Lógica de Cálculo del Porcentaje
    const calculateGrowth = () => {
        if (previousTotal === 0) return 100; // Evitar división por cero
        return ((currentTotal - previousTotal) / previousTotal) * 100;
    };

    const growthPercent = calculateGrowth();
    const isPositive = growthPercent >= 0;

    return (
        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg h-80 flex flex-col">
            <div className="mb-6">
                <h3 className="text-gray-300 text-sm font-medium">Resumen de Ingresos</h3>

                <div className="flex items-end gap-2 mt-1">
                    {/* Dato dinámico de la BD */}
                    <span className="text-2xl font-bold text-white">
                        {formatCurrency(currentTotal)}
                    </span>
                </div>

                <p className="text-sm text-gray-400 mt-1">
                    Este Mes
                    {/* Renderizado condicional del porcentaje calculado */}
                    <span
                        className={`font-medium ml-1 ${
                            isPositive ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {isPositive ? "+" : ""}
                        {growthPercent.toFixed(1)}%
                    </span>
                </p>
            </div>

            <div className="grow w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#9CA3AF", fontSize: 12 }}
                            dy={10}
                        />
                        <Tooltip
                            cursor={{ fill: "rgba(255,255,255,0.05)" }}
                            contentStyle={{
                                backgroundColor: "#1F2937",
                                borderColor: "#374151",
                                color: "#fff",
                                borderRadius: "8px",
                            }}
                            itemStyle={{ color: "#fff" }}
                            formatter={(value) => [`$${value}`, "Ingresos"]}
                        />
                        <Bar dataKey="total" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueChart;
