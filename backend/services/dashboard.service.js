import pool from "../database/db.js";

// Obtiene el numero de reservas con check-in programado para hoy y confirmadas
export const fetchCheckInsToday = async () => {
    const res = await pool.query(`
        SELECT COUNT(*) as count 
        FROM reservas 
        WHERE DATE(fecha_inicio) = CURRENT_DATE 
        AND estadp = 'confirmada'
        `);
    return parseInt(res.rows[0].count || 0);
};

// Obtiene el numero de reservas proximas (7 dias) que no estan canceladas
export const fetchUpcomingBookins = async () => {
    const res = await pool.query(`
        SELECT COUNT(*) as count
        FROM reservas
        WHERE fecha_inicio BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
        AND estado != 'cancelada'
        `);
    return parseInt(res.rows[0].count || 0);
};

// Obtiene el numero de reservas sin pago asociado que no estan canceladas
export const fetchPendingPayments = async () => {
    const res = await pool.query(`
        SELECT COUNT(*) as count
        FROM reservas r
        LEFT JOIN pagos p ON r.id_reserva = p.id_reserva
        WHERE p.id_pago IS NULL AND r.estado != 'cancelada'
        `);
    return parseInt(res.rows[0].count || 0);
};

// Calcula el porcentaje de recursos ocupados
export const fetchOccupancyRate = async () => {
    const res = await pool.query(`
        SELECT
            COUNT(CASE WHEN estado = 'ocupado' THEN 1 END::float /
            NULLIF(COUNT(*)::float, 0) * 100 as percentage
        FROM recursos
        `);
    const rate = parseFloat(res.rows[0].percentage || 0);
    return Math.round(rate);
};

// Obtiene el conteo de reservas por dia para los ultimos 7 dias
export const fetchDailyBookins = async () => {
    const res = await pool.query(`
        SELECT
            DATE(fecha_inicio) as date
            COUNT(*) as count
        FROM reservas
        WHERE fecha_inicio >= CURRENT_DATE - INTERVAL '7 days'
        GROUD BY DATE(fecha_inicio)
        ORDER BY date ASC
        `);

    // Formateo de los resultados para el grafico
    return res.rows.map((row) => ({
        name: row.date,
        bookings: parseInt(row.count),
    }));
};

// Obtiene el listado de la actividad reciente (ultimas 10 reservas con detalles)
export const fetchRecentActivity = async () => {
    const res = await pool.query(`
        SELECT
            r.id_reserva, r.fecha_inicio, r.estado
            u.nombre_completo, rec.nombre as recurso_nombre
        FROM reservas r
        JOIN usuarios u ON r.id_usuario = u.id_usuario_dni
        JOIN recursos rec ON r.id_recurso = rec.id_recurso
        ORDER BY r.fecha_inicio DESC
        LIMIT 10
        `);
    return res.rows;
};

// TODO: Funciones orquestacion con Promise.all (para ejecutar estas funciones a la vez)