import pool from '../database/db.js';

//Crear nueva reserva
export const newReserva = async (data) => {
    const {id_cliente, id_recurso, fecha_inicio, fecha_fin} = data;

    const result = await pool.query(
        'INSERT INTO reservas(id_cliente, id_recurso, fecha_inicio, fecha_fin) VALUES ($1, $2, $3, $4) RETURNING *',
        [id_cliente, id_recurso, fecha_inicio, fecha_fin]
    );
    return result.rows[0];
}

// Obtener todas las reservas
export const getReservas = async () => {
    const result = await pool.query('SELECT * FROM reservas ORDER BY fecha_inicio DESC');
    return result.rows;
};

// Obtener reserva por ID
export const getReservaById = async (id_reserva) => {
    const result = await pool.query(
        'SELECT * FROM reservas WHERE id_reserva = $1',
        [id_reserva]
    );
    return result.rows[0];
};

// Obtener reservas por ID de usuario
export const getReservasByUsuario = async (id_usuario) => {
    const result = await pool.query(
        'SELECT * FROM reservas WHERE id_usuario = $1 ORDER BY fecha_inicio DESC',
        [id_usuario]
    );
    return result.rows;
};

// Obtener reservas por ID de recurso
export const getReservasByRecurso = async (id_recurso) => {
    const result = await pool.query(
        'SELECT * FROM reservas WHERE id_recurso = $1 ORDER BY fecha_inicio DESC',
        [id_recurso]
    );
    return result.rows;
};

// Actualizar una reserva
export const updateReserva = async (id_reserva, data) => {
    const { id_recurso, fecha_inicio, fecha_fin, estado } = data;

    const query = `
        UPDATE reservas
        SET 
            id_recurso = COALESCE($1, id_recurso),
            fecha_inicio = COALESCE($2, fecha_inicio),
            fecha_fin = COALESCE($3, fecha_fin),
            estado = COALESCE($4, estado)
        WHERE id_reserva = $5
        RETURNING *`;

    const result = await pool.query(query, [
        id_recurso,
        fecha_inicio,
        fecha_fin,
        estado,
        id_reserva
    ]);

    return result.rows[0];
};

// Actualizar el estado de una reserva
export const updateEstadoReserva = async (id_reserva, nuevoEstado) => {
    const result = await pool.query(
        'UPDATE reservas SET estado = $1 WHERE id_reserva = $2 RETURNING *',
        [nuevoEstado, id_reserva]
    );
    return result.rows[0];
};