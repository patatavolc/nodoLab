import pool from "../database/db.js";

//Crear nueva reserva
export const newReserva = async (data) => {
    try {
        const { id_cliente, id_recurso, fecha_inicio, fecha_fin } = data;

        const result = await pool.query(
            "INSERT INTO reservas(id_cliente, id_recurso, fecha_inicio, fecha_fin) VALUES ($1, $2, $3, $4) RETURNING *",
            [id_cliente, id_recurso, fecha_inicio, fecha_fin]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error en el servicio newReserva", error.message);
        throw new Error(`Error al crear una nueva reserva: ${error.message}`);
    }
};

// Obtener todas las reservas
export const getReservas = async () => {
    try {
        const result = await pool.query("SELECT * FROM reservas ORDER BY fecha_inicio DESC");
        return result.rows;
    } catch (error) {
        console.error("Error en el servicio getReservas", error.message);
        throw new Error(`Error al obtener todas las reservas: ${error.message}`);
    }
};

// Obtener reserva por ID
export const getReservaById = async (id_reserva) => {
    try {
        const result = await pool.query("SELECT * FROM reservas WHERE id_reserva = $1", [
            id_reserva,
        ]);
        return result.rows[0];
    } catch (error) {
        console.error("Error en el servicio getReservaById", error.message);
        throw new Error(`Error al obtener una reserva por id: ${error.message}`);
    }
};

// Obtener reservas por ID de usuario
export const getReservasByUsuario = async (id_usuario) => {
    const result = await pool.query(
        "SELECT * FROM reservas WHERE id_usuario = $1 ORDER BY fecha_inicio DESC",
        [id_usuario]
    );
    return result.rows;
};

// Obtener reservas por ID de recurso
export const getReservasByRecurso = async (id_recurso) => {
    const result = await pool.query(
        "SELECT * FROM reservas WHERE id_recurso = $1 ORDER BY fecha_inicio DESC",
        [id_recurso]
    );
    return result.rows;
};

// Actualizar una reserva
export const updateReserva = async (id_reserva, data) => {
    const { id_recurso, fecha_inicio, fecha_fin, estado } = data;

    const query = `
        UPDATE reservas
        SET 
            id_recurso = COALESCE($1, id_recurso),
            fecha_inicio = COALESCE($2, fecha_inicio),
            fecha_fin = COALESCE($3, fecha_fin),
            estado = COALESCE($4, estado)
        WHERE id_reserva = $5
        RETURNING *`;

    const result = await pool.query(query, [
        id_recurso,
        fecha_inicio,
        fecha_fin,
        estado,
        id_reserva,
    ]);

    return result.rows[0];
};

// Actualizar el estado de una reserva
export const updateEstadoReserva = async (id_reserva, nuevoEstado) => {
    const result = await pool.query(
        "UPDATE reservas SET estado = $1 WHERE id_reserva = $2 RETURNING *",
        [nuevoEstado, id_reserva]
    );
    return result.rows[0];
};

// Cancelar una reserva
export const cancelarReserva = async (id_reserva) => {
    const result = await pool.query(
        "UPDATE reservas SET estado = 'cancelada' WHERE id_reserva = $1 RETURNING *",
        [id_reserva]
    );
    return result.rows[0];
};

// Eliminar una reserva
export const eliminarReserva = async (id_reserva) => {
    await pool.query("DELETE FROM reservas WHERE id_reserva = $1", [id_reserva]);
    return { message: "Reserva eliminada correctamente" };
};

// Obtener las reservas recientes
export const getReservasRecientes = async () => {
    const result = await pool.query(
        `SELECT 
            r.id_reserva, 
            r.fecha_inicio, 
            r.fecha_fin, 
            r.estado, 
            u.nombre_completo as cliente, 
            rec.nombre as recurso 
        FROM reservas r 
        JOIN usuarios u ON r.id_cliente = u.id_usuario_dni 
        JOIN recursos rec ON r.id_recurso = rec.id_recurso 
        ORDER BY r.fecha_inicio DESC 
        LIMIT 5`
    );
    return result.rows;
};

// Obtener estadisticas de reservas por estado
export const getEstadisticasReservasPorEstado = async () => {
    const result = await pool.query(
        "SELECT estado COUNT(*) as cantidad FROM reservas GROUP BY estado"
    );
    return result.rows;
};
