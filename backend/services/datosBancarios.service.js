import pool from '../database/db.js';

//Crear nuevo dato bancario
export const newDatoBancario = async (data) => {
    try {
        const {id_usuario, IBAN, num_tarjeta, fecha_tarjeta, CVV} = data;

        const result = await pool.query(
            'INSERT INTO datos_bancarios(id_usuario, IBAN, num_tarjeta, fecha_tarjeta, CVV) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id_usuario, IBAN, num_tarjeta, fecha_tarjeta, CVV]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error en el servicio newDatoBancario", error.message);
        throw new Error(`Error al crear un nuevo dato bancario: ${error.message}`);
    }
};

// Obtener todos los datos bancarios
export const getDatosBancariosService = async () => {
    try {
        const result = await pool.query("SELECT * FROM datos_bancarios ORDER BY id_dato_bancario DESC");
        return result.rows;
    } catch (error) {
        console.error("Error en el servicio getDatosBancariosService", error.message);
        throw new Error(`Error al obtener todos los datos bancarios: ${error.message}`);
    }
};

// Obtener datos bancarios por DNI
export const getDatosBancariosByDniService = async (dni) => {
    try {
        const result = await pool.query("SELECT * FROM datos_bancarios WHERE id_usuario = $1", [
            dni,
        ]);
        return result.rows[0];
    } catch (error) {
        console.error("Error en el servicio getDatosBancariosByDniService", error.message);
        throw new Error(`Error al obtener datos bancarios por DNI: ${error.message}`);
    }
};

// Actualizar datos bancarios
export const updateDatosBancariosService = async (id_dato_bancario, data) => {
    try {
        const { IBAN, num_tarjeta, fecha_tarjeta, CVV } = data;

        const query = `
        UPDATE datos_bancarios
        SET 
            IBAN = COALESCE($1, IBAN),
            num_tarjeta = COALESCE($2, num_tarjeta),
            fecha_tarjeta = COALESCE($3, fecha_tarjeta),
            CVV = COALESCE($4, CVV)
        WHERE id_dato_bancario = $5
        RETURNING *`;

        const result = await pool.query(query, [
            IBAN,
            num_tarjeta,
            fecha_tarjeta,
            CVV,
            id_dato_bancario,
        ]);
        return result.rows[0];
    } catch (error) {
        console.error("Error en el servicio updateDatosBancariosService", error.message);
        throw new Error(`Error al actualizar datos bancarios: ${error.message}`);
    }
};

// Eliminar datos bancarios
export const eliminarDatoBancario = async (id_dato_bancario) => {
    try {
        await pool.query("DELETE FROM datos_bancarios WHERE id_dato_bancario = $1", [id_dato_bancario]);
        return { message: "Dato bancario eliminado correctamente" };
    } catch (error) {
        console.error("Error en el servicio eliminarDatoBancario", error.message);
        throw new Error(`Error al eliminar un dato bancario: ${error.message}`);
    }
};