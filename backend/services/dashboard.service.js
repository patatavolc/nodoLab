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
