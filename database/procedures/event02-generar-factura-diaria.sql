CREATE OR REPLACE PROCEDURE generar_factura_diaria()
LANGUAGE plpgsql
AS $$
    DECLARE
    fila RECORD;
    bruto_total NUMERIC :=0;
    iva_total NUMERIC :=0;
    neto_total NUMERIC:=0;
    id_generado INTEGER;
BEGIN
    FOR fila IN
        SELECT subtotal, IVA, total FROM pagos JOIN detalle_factura ON pagos.id_pago = detalle_factura.id_pago WHERE fecha_pago::DATE = CURRENT_DATE
    LOOP
        bruto_total := bruto_total + fila.subtotal;
        iva_total := iva_total + fila.IVA;
        neto_total := neto_total + fila.total;

    END LOOP;

    INSERT INTO facturas(total_bruto, total_IVA, total_neto, tipo) VALUES (bruto_total, iva_total, neto_total, 'diaria') RETURNING id_factura INTO id_generado;

    UPDATE detalle_factura det SET id_factura=id_generado FROM pagos p WHERE det.id_pago = p.id_pago AND p.fecha_pago::DATE = CURRENT_DATE; 
END;
$$;