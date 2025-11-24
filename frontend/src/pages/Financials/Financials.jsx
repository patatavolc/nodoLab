/**
 * LA API TIENE QUE DEVOLVER ALGO ASI
 * {
  "facturas": [
    {
      "id_factura": 1,
      "fecha_factura": "2023-11-20",
      "total_bruto": 150.00,
      "nombre_completo": "Juan Pérez",  // <-- OJO: Esto viene de la tabla USUARIOS
      "fecha_vencimiento": "2023-12-05", // <-- OJO: Calculado por el backend
      "estado_calculado": "Pagado"       // <-- OJO: Calculado por el backend
    }
    // ... más facturas
  ],
  "stats": {
    "totalRevenue": 12450.00,
    "paymentsConfirmed": 9800.00,
    "pendingInvoices": 15,
    "overdueInvoices": 3
  },
  "revenue": {
    "currentMonthTotal": 12450.00,
    "lastMonthTotal": 11800.00,
    "chartData": [
       { "name": "Sem 1", "total": 3000 },
       { "name": "Sem 2", "total": 4500 },
       { "name": "Sem 3", "total": 2000 },
       { "name": "Sem 4", "total": 2950 }
    ]
  }
}

lA CONSULTA NECESARIA PARA HACERLO ES 
SELECT 
    f.id_factura,
    f.fecha_factura,
    f.total_bruto,
    u.nombre_completo,
    -- Lógica para calcular estado (ejemplo simplificado)
    CASE 
        WHEN (SELECT SUM(df.total) FROM detalle_factura df WHERE df.id_factura = f.id_factura) >= f.total_neto THEN 'Pagado'
        WHEN f.fecha_factura + INTERVAL '30 days' < CURRENT_DATE THEN 'Vencido'
        ELSE 'Pendiente'
    END as estado_calculado,
    -- Lógica para fecha vencimiento
    (f.fecha_factura + INTERVAL '30 days') as fecha_vencimiento
FROM 
    facturas f
    -- Estos JOINS son necesarios para llegar al nombre del usuario
    JOIN detalle_factura df ON f.id_factura = df.id_factura
    JOIN pagos p ON df.id_pago = p.id_pago
    JOIN reservas r ON p.id_reserva = r.id_reserva
    JOIN usuarios u ON r.id_usuario = u.id_usuario_dni;
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Layout.jsx";
import FinancialHeader from "../../components/Financials/FinancialHeader.jsx";
import FinancialFilters from "../../components/Financials/FinancialFilter.jsx";
import InvoiceTable from "../../components/Financials/InvoiceTable.jsx";
import FinancialStats from "../../components/Financials/FinancialStats.jsx";
import RevenueChart from "../../components/Financials/RevenueChart.jsx";

const API_URL = "http://localhost:300/api/facturas";

const Financials = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        totalRevenue: 0,
        paymentConfirmed: 0,
        pendingInvoices: 0,
        overdueInvoices: 0,
    });

    const [revenueData, setRevenueData] = useState({
        chartData: [],
        currentMonthTotal: 0,
        lastMonthTotal: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL);
                const data = response.data;

                setInvoices(data.facturas);
                setStats(data.stats);
                setRevenueData(data.revenue);

                setError(null);
            } catch (err) {
                console.error("Error conectando con el backend:", err);
                setError("Error al cargar datos financieros. Revisa la consola.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return (
            <Layout>
                <div className="p-8 text-center text-red-400 bg-gray-900 min-h-full">{error}</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-6 bg-gray-900 min-h-full text-white">
                <FinancialHeader />

                <div className="mt-8">
                    <FinancialFilters />
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <InvoiceTable invoices={invoices} loading={loading} />
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <FinancialStats stats={stats} />
                        <RevenueChart
                            data={revenueData.chartData}
                            currentTotal={revenueData.currentMonthTotal}
                            previousTotal={revenueData.lastMonthTotal}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Financials;
