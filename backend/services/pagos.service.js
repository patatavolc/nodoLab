import pool from "../database/db.js";

//Crear nuevo pago
export const newPago = async (data) => {
    try {
        const { id_reserva, precio_total, metodo_pago } = data;

        const result = await pool.query(
            "INSERT INTO pagos(id_reserva, precio_total, metodo_pago) VALUES($1, $2, $3) RETURNING *",
            [id_reserva, precio_total, metodo_pago]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error en el servicio newPago", error.message);
        throw new Error(`Error al crear un nuevo pago: ${error.message}`);
    }
};

// Obtener todos los pagos
export const obtenerPagos = async () => {
    try {
        const resultado = await pool.query(`SELECT * FROM pagos ORDER BY fecha_pago DESC`);
        return resultado.rows;
    } catch (error) {
        console.error("Error en el servicio obtenerPagos", error.message);
        throw new Error(`Error al obtener todos los pagos: ${error.message}`);
    }
};

// Obtener pago por ID
export const obtenerPagoPorId = async (id_pago) => {
    try {
        const resultado = await pool.query(`SELECT * FROM pagos WHERE id_pago = $1`, [id_pago]);
        return resultado.rows[0];
    } catch (error) {
        console.error("Error en el servicio obtenerPagoPorID", error.message);
        throw new Error(`Error al obtener un pago por ID: ${error.message}`);
    }
};

// Obtener pagos por ID de reserva
export const obtenerPagosPorReserva = async (id_reserva) => {
    try {
        const resultado = await pool.query(
            `SELECT * FROM pagos WHERE id_reserva = $1 ORDER BY fecha_pago DESC`,
            [id_reserva]
        );
        return resultado.rows;
    } catch (error) {
        console.error("Error en el servicio obtenerPagosPorReserva", error.message);
        throw new Error(`Error al obtener pagos por id de reserva: ${error.message}`);
    }
};

// Obtener ingresos por mes (últimos 6 meses)
export const getIngresosPorMes = async () => {
    try {
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
    } catch (error) {
        console.error("Error en el servicio getIngresosPorMes", error.message);
        throw new Error(`Error al obtener los ingresos por mes: ${error.message}`);
    }
};

// Actualizar pago
export const actualizarPago = async (id_pago, data) => {
    try {
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
            id_pago,
        ]);

        return resultado.rows[0];
    } catch (error) {
        console.error("Error en el servicio actualizarPago", error.message);
        throw new Error(`Error al actualizar un pago: ${error.message}`);
    }
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
    const resultado = await pool.query(`SELECT 1 FROM pagos WHERE id_reserva = $1 LIMIT 1`, [
        id_reserva,
    ]);
    return resultado.rowCount > 0;
};

// Eliminar pago
export const eliminarPago = async (id_pago) => {
    const resultado = await pool.query(`DELETE FROM pagos WHERE id_pago = $1 RETURNING *`, [
        id_pago,
    ]);
    return resultado.rows[0];
};
