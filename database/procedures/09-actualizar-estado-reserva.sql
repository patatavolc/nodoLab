CREATE OR REPLACE PROCEDURE ActualizarEstadoReserva(
    p_id_reserva INT,
    p_nuevo_estado VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF p_nuevo_estado NOT IN ('pendiente', 'confirmada', 'completada', 'cancelada') THEN
        RAISE EXCEPTION 'Error: El estado proporcionado ("%") no es válido. Los estados permitidos son: pendiente, confirmada, completada, cancelada.', p_nuevo_estado;
    END IF;

    UPDATE reservas
    SET 
        estado = p_nuevo_estado
    WHERE 
        id_reserva = p_id_reserva;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Error: Reserva con ID % no encontrada.', p_id_reserva;
    END IF;

    RAISE NOTICE 'Reserva ID % actualizada exitosamente al estado: %.', p_id_reserva, p_nuevo_estado;

END;
$$;