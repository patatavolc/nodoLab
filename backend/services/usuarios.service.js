import pool from '../database/db.js';

//Crear nuevo usuario
export const newUsuario = async (data) => {
    const {id_usuario_dni, rol, nombre_completo, username, telefono, email, password_hash, salt} = data;

    const result = await pool.query(
        'INSERT INTO usuarios (id_usuario_dni, rol, nombre_completo, username, telefono, email, password_hash, salt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [id_usuario_dni, rol, nombre_completo, username, telefono, email, password_hash, salt]

    );
    return result.rows[0];
}

// Obtener usuario por DNI
export const getUsuarioByDNI = async (id_usuario_dni) => {
    const result = await pool.query(
        'SELECT * FROM usuarios WHERE id_usuario_dni = $1',
        [id_usuario_dni]
    );
    return result.rows[0];
}

// Obtener usuario por username
export const getUsuarioByUsername = async (username) => {
    const result = await pool.query(
        'SELECT * FROM usuarios WHERE username = $1',
        [username]
    );
    return result.rows[0];
}