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
