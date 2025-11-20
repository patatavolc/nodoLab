CREATE OR REPLACE PROCEDURE CrearReservaSinSolapamiento (
    p_id_usuario VARCHAR(9),
    p_id_recurso INT,
    p_fecha_inicio TIMESTAMP WITH TIME ZONE,
    p_fecha_fin TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_estado_recurso VARCHAR(20);
    v_count INT;
BEGIN
    -- Validación de fechas
    IF p_fecha_fin <= p_fecha_inicio THEN
        RAISE EXCEPTION 'La fecha de fin debe ser posterior a la fecha de inicio.';
    END IF;

    -- Verificar que el recurso exista y esté disponible
    SELECT estado INTO v_estado_recurso
    FROM recursos
    WHERE id_recurso = p_id_recurso;

    IF v_estado_recurso IS NULL THEN
        RAISE EXCEPTION 'El recurso con ID % no existe.', p_id_recurso;
    END IF;

    IF v_estado_recurso <> 'disponible' THEN
        RAISE EXCEPTION 'El recurso con ID % no está disponible actualmente.', p_id_recurso;
    END IF;

    -- Validar que no haya reservas superpuestas
    SELECT COUNT(*) INTO v_count
    FROM reservas
    WHERE id_recurso = p_id_recurso
      AND estado IN ('pendiente', 'confirmada')
      AND (fecha_inicio, fecha_fin) OVERLAPS (p_fecha_inicio, p_fecha_fin);

    IF v_count > 0 THEN
        RAISE EXCEPTION 'El recurso % ya está reservado en el rango solicitado.', p_id_recurso;
    END IF;

    -- Crear la reserva
    INSERT INTO reservas (
        id_usuario,
        id_recurso,
        fecha_inicio,
        fecha_fin,
        estado
    )
    VALUES (
        p_id_usuario,
        p_id_recurso,
        p_fecha_inicio,
        p_fecha_fin,
        'pendiente'
    );

END;
$$;