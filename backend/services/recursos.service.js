import pool from "../database/db.js";

//Crear un recurso
export const newRecurso = async (data) => {
    const { nombre, tipo, descripcion, capacidad, precio } = data;

    const result = await pool.query(
        "INSERT INTO recursos(nombre, tipo, descripcion, capacidad, precio) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [nombre, tipo, descripcion, capacidad, precio]
    );
    return result.rows[0];
};

// Obtener todos los recursos
export const getRecursos = async () => {
    const result = await pool.query("SELECT * FROM recursos ORDER BY nombre ASC");
    return result.rows;
};

// Obtener recurso por ID
export const getRecursoById = async (id_recurso) => {
    const result = await pool.query("SELECT * FROM recursos WHERE id_recurso = $1", [id_recurso]);
    return result.rows[0];
};

// Obtener recursos por tipo
export const getRecursosByTipo = async (tipo) => {
    const result = await pool.query("SELECT * FROM recursos WHERE tipo = $1 ORDER BY nombre ASC", [
        tipo,
    ]);
    return result.rows;
};

// Obtener recursos por Estado
export const getRecursosByEstado = async (estado) => {
    const result = await pool.query(
        "SELECT * FROM recursos WHERE estado = $1 ORDER BY nombre ASC",
        [estado]
    );
    return result.rows;
};

// Actualizar recurso
export const updateRecurso = async (id_recurso, data) => {
    const { nombre, tipo, descripcion, capacidad, estado, precio_hora } = data;

    const query = `
        UPDATE recursos
        SET 
            nombre = COALESCE($1, nombre),
            tipo = COALESCE($2, tipo),
            descripcion = COALESCE($3, descripcion),
            capacidad = COALESCE($4, capacidad),
            estado = COALESCE($5, estado),
            precio_hora = COALESCE($6, precio_hora)
        WHERE id_recurso = $7
        RETURNING *`;

    const result = await pool.query(query, [
        nombre,
        tipo,
        descripcion,
        capacidad,
        estado,
        precio_hora,
        id_recurso,
    ]);

    return result.rows[0];
};

// Actualizar capacidad de un recurso
export const updateCapacidad = async (id_recurso, capacidad) => {
    const result = await pool.query(
        "UPDATE recursos SET capacidad = $1 WHERE id_recurso = $2 RETURNING *",
        [capacidad, id_recurso]
    );
    return result.rows[0];
};

// Actualizar precio por hora de un recurso
export const updatePrecioHora = async (id_recurso, precio_hora) => {
    const result = await pool.query(
        "UPDATE recursos SET precio_hora = $1 WHERE id_recurso = $2 RETURNING *",
        [precio_hora, id_recurso]
    );
    return result.rows[0];
};

// Buscar recursos por nombre o descripcion
export const buscarRecursos = async (texto) => {
    const busqueda = `%${texto}%`;

    const query = `
        SELECT * FROM recursos
        WHERE 
            nombre ILIKE $1 OR
            descripcion ILIKE $1
        ORDER BY nombre ASC`;

    const result = await pool.query(query, [busqueda]);
    return result.rows;
};

// Eliminar un recurso
export const deleteRecurso = async (id_recurso) => {
    await pool.query("DELETE FROM recursos WHERE id_recurso = $1", [id_recurso]);
    return { mensaje: "Recurso eliminado correctamente" };
};

// Obtener recursos mas reservados
export const getRecursosMasReservados = async () => {
    const result = await pool.query(`
        SELECT
            rec.id_recurso,
            rec.nombre,
            rec.tipo,
            COUNT(r.id_reserva) as total_reservas
        FROM recursos rec
        LEFT JOIN reservas r ON rec.id_recurso = r.id_recurso
        GROUP BY rec.id_recurso, rec.nombre, rec.tipo
        ORDER BY total_reservas DESC
        LIMIT 5
            `);
    return result.rows;
};

// Obtener la tasa de ocupacion de recursos
export const getTasaOcupacionRecursos = async () => {
    const result = await pool.query(`
        SELECT
            rec.id_recurso,
            rec.nombre,
            rec.tipo,
            COUNT(r.id_reserva) as reservas_totales
            COUNT(CASE WHEN r.estado = 'confirmada' THEN 1 END) as reservas_confirmadas
        FROM recursos rec
        LEFT JOIN reservas r ON rec.id_recurso = r.id_recurso
        GROUP BY rec.id_recurso, rec.nombre, rec.tipo
        ORDER BY reservas_totales DESC
        `);
    return result.rows;
};
