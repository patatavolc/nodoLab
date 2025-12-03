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
