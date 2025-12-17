import pool from "../database/db.js";

//Crear un recurso
export const newRecurso = async (data) => {
    try {
        const { nombre, tipo, descripcion, capacidad, precio } = data;

        const result = await pool.query(
            "INSERT INTO recursos(nombre, tipo, descripcion, capacidad, precio) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [nombre, tipo, descripcion, capacidad, precio]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error en el servicio newRecurso:", error.message);
        throw new Error(`Error al crear un recurso nuevo: ${error.message}`);
    }
};

// Obtener todos los recursos
export const getAllRecursosService = async () => {
    try {
        const result = await pool.query("SELECT * FROM recursos ORDER BY nombre ASC");
        return result.rows;
    } catch (error) {
        console.error("Error en el servicio getAllRecursos:", error.message);
        throw new Error(`Error al obtener todos los recursos: ${error.message}`);
    }
};

// Obtener recurso por ID
export const getRecursoByIdService = async (id_recurso) => {
    try {
        const result = await pool.query("SELECT * FROM recursos WHERE id_recurso = $1", [
            id_recurso,
        ]);
        return result.rows[0];
    } catch (error) {
        console.error("Error en el servicio getRecursoById:", error.message);
        throw new Error(`Error al obtener recurso por id: ${error.message}`);
    }
};

// Obtener recursos por tipo
export const getRecursosByTipoService = async (tipo) => {
    try {
        const result = await pool.query(
            "SELECT * FROM recursos WHERE tipo = $1 ORDER BY nombre ASC",
            [tipo]
        );
        return result.rows;
    } catch (error) {
        console.error("Error en el servicio getRecursoByTipo:", error.message);
        throw new Error(`Error al obtener el recurso por tipo: ${error.message}`);
    }
};

// Obtener recursos por Estado
export const getRecursosByEstado = async (estado) => {
    try {
        const result = await pool.query(
            "SELECT * FROM recursos WHERE estado = $1 ORDER BY nombre ASC",
            [estado]
        );
        return result.rows;
    } catch (error) {
        console.error("Error en el servicio getRecursosByEstado:", error.message);
        throw new Error(`Error al obtener recursos por estado: ${error.message}`);
    }
};

// Actualizar recurso
export const updateRecurso = async (id_recurso, data) => {
    try {
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
    } catch (error) {
        console.error("Error en el servicio updateRecurso:", error.message);
        throw new Error(`Error al actualizar un recurso: ${error.message}`);
    }
};

// Actualizar capacidad de un recurso
export const updateCapacidad = async (id_recurso, capacidad) => {
    try {
        const result = await pool.query(
            "UPDATE recursos SET capacidad = $1 WHERE id_recurso = $2 RETURNING *",
            [capacidad, id_recurso]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error en el servicio updateCapacidad:", error.message);
        throw new Error(`Error al actualizar la capacidad de un recurso: ${error.message}`);
    }
};
// Actualizar precio por hora de un recurso
export const updatePrecioHora = async (id_recurso, precio_hora) => {
    try {
        const result = await pool.query(
            "UPDATE recursos SET precio_hora = $1 WHERE id_recurso = $2 RETURNING *",
            [precio_hora, id_recurso]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error en el servicio updatePrecioHora:", error.messsage);
        throw new Error("Error al actualizar el precio por hora de un recurso");
    }
};

// Buscar recursos por nombre o descripcion
export const buscarRecursos = async (texto) => {
    try {
        const busqueda = `%${texto}%`;

        const query = `
        SELECT * FROM recursos
        WHERE 
            nombre ILIKE $1 OR
            descripcion ILIKE $1
        ORDER BY nombre ASC`;

        const result = await pool.query(query, [busqueda]);
        return result.rows;
    } catch (error) {
        console.error("Error en el servicio buscarRecursos:", error.message);
        throw new Error(`Error al buscar un servicio por texto: ${error.message}`);
    }
};

// Eliminar un recurso
export const deleteRecurso = async (id_recurso) => {
    try {
        await pool.query("DELETE FROM recursos WHERE id_recurso = $1", [id_recurso]);
        return { mensaje: "Recurso eliminado correctamente" };
    } catch (error) {
        console.error("Error en el servicio deleteRecurso", error.message);
        throw new Error(`Error al eliminar un recurso: ${error.message}`);
    }
};

// Obtener recursos mas reservados
export const getRecursosMasReservados = async () => {
    try {
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
    } catch (error) {
        console.error("Error en el servicio getRecursosMasReservados:", error.message);
        throw new Error(`Error al obtener los servicios mas reservados: ${error.message}`);
    }
};

// Obtener la tasa de ocupacion de recursos
export const getTasaOcupacionRecursos = async () => {
    try {
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
    } catch (error) {
        console.error("Error en el servicio getTasaOcupacionRecursos", error.messsage);
        throw new Error(`Error al obtener la tasa de ocupacion de los recursos: ${error.message}`);
    }
};

export const getRecursosDisponiblesService = async (fecha_inicio, fecha_fin) => {
    try {
        const result = await pool.query("SELECT * FROM ObetenerrecursosDisponibles($1, $2)", [
            fecha_inicio,
            fecha_fin,
        ]);
        return result.rows;
    } catch (error) {
        console.error("Error en getRecursosDisponiblesService", error.message);
        throw new Error(`Error al buscar disponibilidad: ${error.message}`);
    }
};
