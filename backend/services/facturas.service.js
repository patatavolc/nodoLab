import pool from '../database/db.js';

//Crear nueva factura
export const newFactura = async (data) => {
    const {fecha_factura, total_bruto, total_IVA, total_neto, tipo} = data 

    const result = await pool.query(
        'INSERT INTO facturas(fecha_factura, total_bruto, total_IVA, total_neto, tipo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [fecha_factura, total_bruto, total_IVA, total_neto, tipo]
    );
    return result.rows[0];
}