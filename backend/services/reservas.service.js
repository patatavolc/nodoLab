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