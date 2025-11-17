// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Dashboard/Header.jsx";
import StatCard from "../../components/Dashboard/StatCard.jsx";
import DailyBookingsChart from "../../components/Dashboard/DailyBookingsChart.jsx";
import CurrentOccupancyGauge from "../../components/ashboard/CurrentOccupancyGauge.jsx";
import RecentActivity from "../../components/Dashboard/RecentActivity.jsx";
import QuickActions from "../../components/Dashboard/QuickActions.jsx";
import Layout from "../Layout.jsx";

// URL base de tu API (Asegúrate que esta sea la dirección correcta)
const API_BASE_URL = "http://localhost:3000/api/dashboard";

// Estado Inicial Totalmente Vacío/Neutro
const initialDataState = {
  stats: null, // Lo inicializamos a null
  dailyBookings: null, // Lo inicializamos a null
  occupancy: null, // Lo inicializamos a null
  recentActivity: null, // Lo inicializamos a null
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(initialDataState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_BASE_URL);

        // Se asume que el backend devuelve un objeto con las claves:
        // stats, dailyBookings, occupancy, recentActivity
        // IMPORTANTE ESTE ORDEN
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error al obtener datos del dashboard:", err);
        setError("No se pudieron cargar los datos. Verifica el backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-white bg-gray-900 min-h-screen">
        Cargando datos del Backend...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-400 bg-gray-900 min-h-screen">Error: {error}</div>
    );
  }

  const { stats, dailyBookings, occupancy, recentActivity } = data;

  // Destructuración segura. Solo se hace si stats existe.
  const [checkIns, upcomingBookings, pendingPayments, newSignups] = stats || [];

  return (
    <Layout>
      <div className="p-4 sm:p-6 bg-gray-900 text-white min-h-full">
        <Header userName="Alex" appName="NodoLab" />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Solo se renderiza si el array stats está definido y tiene 4 elementos */}
          {stats && stats.length === 4 && (
            <>
              <StatCard
                title="Today's Check-ins"
                value={checkIns.value}
                change={checkIns.change}
                isPositive={checkIns.isPositive}
              />
              <StatCard
                title="Upcoming Bookings"
                value={upcomingBookings.value}
                change={upcomingBookings.change}
                isPositive={upcomingBookings.isPositive}
              />
              <StatCard
                title="Pending Payments"
                value={pendingPayments.value}
                change={pendingPayments.change}
                isPositive={pendingPayments.isPositive}
              />
              <StatCard
                title="New Member Signups"
                value={newSignups.value}
                change={newSignups.change}
                isPositive={newSignups.isPositive}
              />
            </>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico de Reservas Diarias: Solo si dailyBookings existe */}
          <div className="lg:col-span-2">
            {dailyBookings && <DailyBookingsChart data={dailyBookings} />}
          </div>

          {/* Medidor de Ocupación: Solo si occupancy existe */}
          <div className="lg:col-span-1">
            {occupancy !== null && <CurrentOccupancyGauge percentage={occupancy} />}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Actividad Reciente: Solo si recentActivity existe */}
          <div className="lg:col-span-2">
            {recentActivity && <RecentActivity activityData={recentActivity} />}
          </div>

          {/* Acciones Rápidas (fijas, sin datos del backend) */}
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
