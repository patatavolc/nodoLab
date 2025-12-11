import pool from "../database/db.js";

//Crear nuevo usuario
export const newUsuario = async (data) => {
    try {
        const {
            id_usuario_dni,
            rol,
            nombre_completo,
            username,
            telefono,
            email,
            password_hash,
            salt,
        } = data;

        const result = await pool.query(
            "INSERT INTO usuarios (id_usuario_dni, rol, nombre_completo, username, telefono, email, password_hash, salt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [id_usuario_dni, rol, nombre_completo, username, telefono, email, password_hash, salt]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error en el servicio newUsuario", error.message);
        throw new Error(`Error al crear un usuario nuevo: ${error.message}`);
    }
};

// Obtener todos los usuarios
export const getUsuariosService = async () => {
    try {
        const result = await pool.query("SELECT * FROM usuarios ORDER BY nombre_completo ASC");
        return result.rows;
    } catch (error) {
        console.error("Error en el servicio getUsuarios", error.message);
        throw new Error(`Error al obtener los usuarios: ${error.message}`);
    }
};

// Obtener usuario por DNI
export const getUsuarioByDNIService = async (id_usuario_dni) => {
    try {
        const result = await pool.query("SELECT * FROM usuarios WHERE id_usuario_dni = $1", [
            id_usuario_dni,
        ]);
        return result.rows[0];
    } catch (error) {
        console.error("Error en el servico getUsuarioByDNI:", error.message);
        throw new Error(`Error al obtener un usuario por DNI: ${error.message}`);
    }
};

// Obtener usuario por username
export const getUsuarioByUsernameService = async (username) => {
    try {
        const result = await pool.query("SELECT * FROM usuarios WHERE username = $1", [username]);
        return result.rows[0];
    } catch (error) {
        console.error("Error en el servico getUsuarioByUsername", error.message);
        throw new Error(`Error al obtener un usuario por su username: ${error.message}`);
    }
};

// Actualizar usuario
export const updateUsuarioService = async (id_usuario_dni, data) => {
    try {
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
            id_usuario_dni,
        ]);

        return result.rows[0];
    } catch (error) {
        console.error("Error en el servicio updateUsuario:", error.message);
        throw new Error(`Error al actualizar un usuario: ${error.message}`);
    }
};

// Actualizar contraseña de usuario
export const updatePassword = async (id_usuario_dni, password_hash, salt) => {
    try {
        const query = `
        UPDATE usuarios
        SET password_hash = $1,
            salt = $2
        WHERE id_usuario_dni = $3
        RETURNING *`;

        const result = await pool.query(query, [password_hash, salt, id_usuario_dni]);

        return result.rows[0];
    } catch (error) {
        console.error("Error en el servicio updatePassword", error.message);
        throw new Error(`Error al actualizar la password de un usuario: ${error.message}`);
    }
};

// Actualizar rol de usuario
export const updateRol = async (id_usuario_dni, nuevoRol) => {
    const result = await pool.query(
        "UPDATE usuarios SET rol = $1 WHERE id_usuario_dni = $2 RETURNING *",
        [nuevoRol, id_usuario_dni]
    );
    return result.rows[0];
};

// Verificar si el email ya existe
export const emailExiste = async (email) => {
    const result = await pool.query("SELECT 1 FROM usuarios WHERE email = $1", [email]);
    return result.rowCount > 0;
};

// Verificar si el username ya existe
export const usernameExiste = async (username) => {
    const result = await pool.query("SELECT 1 FROM usuarios WHERE username = $1", [username]);
    return result.rowCount > 0;
};

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
};

// Eliminar usuario
export const deleteUsuario = async (id_usuario_dni) => {
    await pool.query("DELETE FROM usuarios WHERE id_usuario_dni = $1", [id_usuario_dni]);
    return { mensaje: "Usuario eliminado correctamente" };
};

// Obtener usuarios mas activos (con mas reservas)
export const getUsuariosMasActivos = async () => {
    const result = await pool.query(`
        SELECT 
        u.id_usuario_dni, 
        u.nombre_completo, 
        u.email, 
        u.rol,
        COUNT(r.id_reserva) as total_reservas
        FROM usuarios u
        LEFT JOIN reservas r ON u.id_usuario_dni = r.id_cliente
        GROUP BY u.id_usuario_dni, u.nombre_completo, u.email
        ORDER BY total_reservas DESC
        LIMIT 5`);
    return result.rows;
};
