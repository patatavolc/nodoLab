CREATE OR REPLACE PROCEDURE RegistrarPagoYConfirmarReserva(
    p_id_reserva INT,
    p_metodo_pago VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_precio_total DECIMAL(10, 2);
BEGIN

    v_precio_total := CalcularPrecioTotal(p_id_reserva);

    INSERT INTO pagos (
        id_reserva, 
        precio_total, 
        metodo_pago, 
        fecha_pago, 
        devolucion
    )
    VALUES (
        p_id_reserva, 
        v_precio_total, 
        p_metodo_pago, 
        CURRENT_TIMESTAMP, 
        FALSE
    );

    UPDATE reservas
    SET 
        estado = 'confirmada'
    WHERE 
        id_reserva = p_id_reserva
        AND estado = 'pendiente';

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Error: La reserva ID % no pudo ser confirmada (ya estaba confirmada/cancelada o no existe).', p_id_reserva;
    END IF;


EXCEPTION
    WHEN OTHERS THEN

        RAISE NOTICE 'Transacción fallida para Reserva ID %: %', p_id_reserva, SQLERRM;
        RAISE;
END;
$$;