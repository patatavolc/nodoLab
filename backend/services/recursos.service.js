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

// Obtener todos los recursos
export const getRecursos = async () => {
    const result = await pool.query('SELECT * FROM recursos ORDER BY nombre ASC');
    return result.rows;
};

// Obtener recurso por ID
export const getRecursoById = async (id_recurso) => {
    const result = await pool.query(
        'SELECT * FROM recursos WHERE id_recurso = $1',
        [id_recurso]
    );
    return result.rows[0];
};

// Obtener recursos por tipo
export const getRecursosByTipo = async (tipo) => {
    const result = await pool.query(
        'SELECT * FROM recursos WHERE tipo = $1 ORDER BY nombre ASC',
        [tipo]
    );
    return result.rows;
};