import pool from '../database/db.js';

//Crear un recurso
export const newRecurso = async (data) => {
    const {nombre, tipo, descripcion, capacidad, precio} = data;

    const result = await pool.query(
        'INSERT INTO recursos(nombre, tipo, descripcion, capacidad, precio) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nombre, tipo, descripcion, capacidad, precio]
    );
    return result.rows[0];
}