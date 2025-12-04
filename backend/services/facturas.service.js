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

//Obtener todas las facturas
export const getFacturas = async () => {
    const result = await pool.query("SELECT * FROM facturas ORDER BY fecha_factura DESC");
    return result.rows;
};

//Obtener facturas por ID
export const getFacturasById = async (id_factura) => {
    const result = await pool.query(
        "SELECT * FROM facturas WHERE id_factura = $1", 
        [id_factura]
    );
    return result.rows[0];
};

// Actualizar una factura
export const updateFactura = async (id_factura, data) => {
    const { fecha_factura, total_bruto, total_IVA, total_neto, tipo } = data;

    const query = `
        UPDATE reservas
        SET 
            fecha_factura = COALESCE($1, fecha_factura),
            total_bruto = COALESCE($2, total_bruto),
            total_IVA = COALESCE($3, total_IVA),
            total_neto = COALESCE($4, total_neto),
            tipo = COALESCE($5, tipo)
        WHERE id_factura = $6
        RETURNING *`;

    const result = await pool.query(query, [
        fecha_factura,
        total_bruto,
        total_IVA,
        total_neto,
        tipo,
        id_factura
    ]);
    return result.rows[0];
};

// Eliminar una factura
export const eliminarFactura = async (id_factura) => {
    await pool.query(
        "DELETE FROM facturas WHERE id_factura = $1", 
        [id_factura]);
    return { message: "Reserva eliminada correctamente" };
};