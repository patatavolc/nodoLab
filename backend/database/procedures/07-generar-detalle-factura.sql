CREATE OR REPLACE FUNCTION GenerarDetalleFactura(
    p_id_factura INT,
    p_id_pago INT,
    p_tasa_iva DECIMAL DEFAULT 0.21 
)
RETURNS VOID AS $$
DECLARE
    v_subtotal_bruto DECIMAL(10, 2); 
    v_monto_iva DECIMAL(10, 2);
    v_total_neto DECIMAL(10, 2);
BEGIN

    SELECT 
        precio_total
    INTO 
        v_subtotal_bruto
    FROM 
        pagos
    WHERE 
        id_pago = p_id_pago;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Error: Pago con ID % no encontrado.', p_id_pago;
    END IF;

    v_monto_iva := ROUND(v_subtotal_bruto * (p_tasa_iva / (1.0 + p_tasa_iva)), 2);
    
    v_total_neto := ROUND(v_subtotal_bruto - v_monto_iva, 2);

    INSERT INTO detalle_factura (
        id_factura,
        id_pago,
        subtotal, 
        IVA,  
        total    
    )
    VALUES (
        p_id_factura,
        p_id_pago,
        v_subtotal_bruto,
        v_monto_iva,
        v_total_neto
    );

END;
$$ LANGUAGE plpgsql;