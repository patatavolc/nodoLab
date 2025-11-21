CREATE OR REPLACE PROCEDURE GenerarFacturaMensual(
    p_anio INT,
    p_mes INT,
    p_tasa_iva DECIMAL DEFAULT 0.21
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_id_factura INT;
    v_pago RECORD;
    v_fecha_inicio DATE;
    v_fecha_fin DATE;
BEGIN
    v_fecha_inicio := MAKE_DATE(p_anio, p_mes, 1);
    v_fecha_fin := (v_fecha_inicio + INTERVAL '1 month') - INTERVAL '1 day';

    INSERT INTO facturas (fecha_factura, total_bruto, total_IVA, total_neto, tipo)
    VALUES (CURRENT_DATE, 0, 0, 0, 'mensual')
    RETURNING id_factura INTO v_id_factura;

    FOR v_pago IN
        SELECT 
            p.id_pago
        FROM 
            pagos p
        LEFT JOIN 
            detalle_factura df ON p.id_pago = df.id_pago
        WHERE 
            df.id_pago IS NULL
            AND p.fecha_pago >= v_fecha_inicio
            AND p.fecha_pago <= v_fecha_fin
    LOOP

        PERFORM GenerarDetalleFactura(v_id_factura, v_pago.id_pago, p_tasa_iva);
    END LOOP;

    UPDATE facturas f
    SET 
        total_bruto = COALESCE(SUM(df.subtotal), 0),
        total_IVA = COALESCE(SUM(df.IVA), 0),
        total_neto = COALESCE(SUM(df.total), 0)
    FROM 
        detalle_factura df
    WHERE 
        df.id_factura = v_id_factura
        AND f.id_factura = v_id_factura;
    
    IF (SELECT COUNT(*) FROM detalle_factura WHERE id_factura = v_id_factura) = 0 THEN
        RAISE NOTICE 'No se encontraron pagos pendientes para facturar en %-%s. La factura ID %s se ha creado vacía.', p_anio, p_mes, v_id_factura;
    
    ELSE
        RAISE NOTICE 'Factura Mensual ID %s generada exitosamente para el periodo %s-%s.', v_id_factura, p_anio, p_mes;
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error al generar la factura mensual para %-%s: %s', p_anio, p_mes, SQLERRM;
END;
$$;