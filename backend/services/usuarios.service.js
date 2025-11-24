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

// Obtener todos los usuarios
export const getUsuarios = async () => {
    const result = await pool.query(
        'SELECT * FROM usuarios ORDER BY nombre_completo ASC'
    );
    return result.rows;
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

// Actualizar usuario
export const updateUsuario = async (id_usuario_dni, data) => {
    const { nombre_completo, rol, telefono, email } = data;

    const query = `
        UPDATE usuarios
        SET 
            nombre_completo = COALESCE($1, nombre_completo),
            rol = COALESCE($2, rol),
            telefono = COALESCE($3, telefono),
            email = COALESCE($4, email)
        WHERE id_usuario_dni = $5
        RETURNING *`;

    const result = await pool.query(query, [
        nombre_completo,
        rol,
        telefono,
        email,
        id_usuario_dni
    ]);

    return result.rows[0];
}

// Actualizar contraseña de usuario
export const updatePassword = async (id_usuario_dni, password_hash, salt) => {
    const query = `
        UPDATE usuarios
        SET password_hash = $1,
            salt = $2
        WHERE id_usuario_dni = $3
        RETURNING *`;

    const result = await pool.query(query, [
        password_hash,
        salt,
        id_usuario_dni
    ]);

    return result.rows[0];
}

// Actualizar rol de usuario
export const updateRol = async (id_usuario_dni, nuevoRol) => {
    const result = await pool.query(
        'UPDATE usuarios SET rol = $1 WHERE id_usuario_dni = $2 RETURNING *',
        [nuevoRol, id_usuario_dni]
    );
    return result.rows[0];
}

// Verificar si el email ya existe
export const emailExiste = async (email) => {
    const result = await pool.query(
        'SELECT 1 FROM usuarios WHERE email = $1',
        [email]
    );
    return result.rowCount > 0;
}

// Verificar si el username ya existe
export const usernameExiste = async (username) => {
    const result = await pool.query(
        'SELECT 1 FROM usuarios WHERE username = $1',
        [username]
    );
    return result.rowCount > 0;
}

// Buscar usuarios por nombre, email o username
export const buscarUsuarios = async (texto) => {
    const busqueda = `%${texto}%`;

    const query = `
        SELECT * FROM usuarios 
        WHERE 
            nombre_completo ILIKE $1 OR
            email ILIKE $1 OR
            username ILIKE $1
        ORDER BY nombre_completo ASC`;

    const result = await pool.query(query, [busqueda]);
    return result.rows;
}

// Eliminar usuario
export const deleteUsuario = async (id_usuario_dni) => {
    await pool.query('DELETE FROM usuarios WHERE id_usuario_dni = $1', [
        id_usuario_dni,
    ]);
    return { mensaje: 'Usuario eliminado correctamente' };
}