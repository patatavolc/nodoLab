import pool from '../database/db.js';

//Crear nuevo pago
export const newPago = async (data) => {
    const {id_reserva, precio_total, metodo_pago} = data;

    const result = await pool.query(
        'INSERT INTO pagos(id_reserva, precio_total, metodo_pago) VALUES($1, $2, $3) RETURNING *',
        [id_reserva, precio_total, metodo_pago]
    );
    return result.rows[0];
}

// Obtener todos los pagos
export const obtenerPagos = async () => {
    const resultado = await pool.query(
        `SELECT * FROM pagos ORDER BY fecha_pago DESC`
    );
    return resultado.rows;
};

// Obtener pago por ID
export const obtenerPagoPorId = async (id_pago) => {
    const resultado = await pool.query(
        `SELECT * FROM pagos WHERE id_pago = $1`,
        [id_pago]
    );
    return resultado.rows[0];
};