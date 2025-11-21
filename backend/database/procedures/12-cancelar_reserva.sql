CREATE OR REPLACE PROCEDURE CancelarReserva (
    p_id_reserva INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_id_recurso INT;
    v_estado_reserva VARCHAR(20);
    v_id_pago INT;
BEGIN

    -- Obtener la información de la reserva
    SELECT id_recurso, estado
    INTO v_id_recurso, v_estado_reserva
    FROM reservas
    WHERE id_reserva = p_id_reserva;

    -- Validar que la reserva exista
    IF v_id_recurso IS NULL THEN
        RAISE EXCEPTION 'La reserva con ID % no existe.', p_id_reserva;
    END IF;

    -- Evitar cancelar reservas ya canceladas
    IF v_estado_reserva = 'cancelada' THEN
        RAISE EXCEPTION 'La reserva con ID % ya se encuentra cancelada.', p_id_reserva;
    END IF;

    -- Marcar la reserva como cancelada
    UPDATE reservas
    SET estado = 'cancelada'
    WHERE id_reserva = p_id_reserva;

    -- Verificar si existe un pago asociado
    SELECT id_pago
    INTO v_id_pago
    FROM pagos
    WHERE id_reserva = p_id_reserva;

    -- Si existe pago, marcar como devolución
    IF v_id_pago IS NOT NULL THEN
        UPDATE pagos
        SET devolucion = TRUE
        WHERE id_pago = v_id_pago;
    END IF;

    -- Restaurar el estado del recurso a disponible
    UPDATE recursos
    SET estado = 'disponible'
    WHERE id_recurso = v_id_recurso;

END;
$$;