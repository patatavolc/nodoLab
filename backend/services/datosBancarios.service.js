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