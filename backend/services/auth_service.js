import pool from '../db/db.js';

export const takenMail = async (email) => {
    const result = await pool.query(
        `SELECT * FROM usuarios WHERE email = $1`,
        [email]
    );
    return result.rows.length > 0;
};

export const takenUsername = async (username) => {
    const result = await pool.query(
        `SELECT * FROM usuarios WHERE username = $1`,
        [username]
    );
    return result.rows.length > 0;
};

export const takenDNI = async (dni) => {
    const result = await pool.query(
        `SELECT * FROM usuarios WHERE id_usuario_dni = $1`,
        [dni]
    );
    return result.rows.length > 0;
};

export const registerValidatedUser = async (dni, nombre, username, telefono, email, passwordHash, salt) => {
    const result = await pool.query(
        `INSERT INTO usuarios(id_usuario_dni, rol, nombre_completo, username, telefono, email, password_hash, salt) VALUES ($1, 'cliente', $2, $3, $4, $5, $6, $7) RETURNING *`,
        [dni, nombre, username, telefono, email, passwordHash, salt]
    );
    return result.rows[0];
}
