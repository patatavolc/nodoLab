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

// Obtener pagos por ID de reserva
export const obtenerPagosPorReserva = async (id_reserva) => {
    const resultado = await pool.query(
        `SELECT * FROM pagos WHERE id_reserva = $1 ORDER BY fecha_pago DESC`,
        [id_reserva]
    );
    return resultado.rows;
};

// Obtener ingresos por mes (últimos 6 meses)
export const getIngresosPorMes = async () => {
    const result = await pool.query(
        `
        SELECT
            TO_CHAR(fecha_pago, 'YYYY-MM') as mes,
            SUM(importe) as total
        FROM pagos
        WHERE estado = $1
        AND fecha_pago >= NOW() - INTERVAL '6 months'
        GROUP BY TO_CHAR(fecha_pago, 'YYYY-MM')
        ORDER BY mes DESC
    `,
        ["completado"]
    );
    return result.rows;
};

// Actualizar pago
export const actualizarPago = async (id_pago, data) => {
    const { precio_total, metodo_pago, fecha_pago, devolucion } = data;

    const query = `
        UPDATE pagos
        SET
            precio_total = COALESCE($1, precio_total),
            metodo_pago  = COALESCE($2, metodo_pago),
            fecha_pago   = COALESCE($3, fecha_pago),
            devolucion   = COALESCE($4, devolucion)
        WHERE id_pago = $5
        RETURNING *`;
    
    const resultado = await pool.query(query, [
        precio_total,
        metodo_pago,
        fecha_pago,
        devolucion,
        id_pago
    ]);

    return resultado.rows[0];
};

// Marcar/desmarcar devolución
export const marcarDevolucion = async (id_pago, valor = true) => {
    const resultado = await pool.query(
        `UPDATE pagos SET devolucion = $1 WHERE id_pago = $2 RETURNING *`,
        [valor, id_pago]
    );
    return resultado.rows[0];
};

// Verificar si existe un pago para una reserva
export const existePagoParaReserva = async (id_reserva) => {
    const resultado = await pool.query(
        `SELECT 1 FROM pagos WHERE id_reserva = $1 LIMIT 1`,
        [id_reserva]
    );
    return resultado.rowCount > 0;
};

// Eliminar pago
export const eliminarPago = async (id_pago) => {
    const resultado = await pool.query(
        `DELETE FROM pagos WHERE id_pago = $1 RETURNING *`,
        [id_pago]
    );
    return resultado.rows[0];
};