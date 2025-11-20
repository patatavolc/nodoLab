import pool from '../database/db.js';

//Crear nuevo dato bancario
export const newDatoBancario = async (data) => {
    const {id_usuario, IBAN, num_tarjeta, fecha_tarjeta, CVV} = data;

    const result = await pool.query(
        'INSERT INTO datos_bancarios(id_usuario, IBAN, num_tarjeta, fecha_tarjeta, CVV) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id_usuario, IBAN, num_tarjeta, fecha_tarjeta, CVV]
    );
    return result.rows[0];
}