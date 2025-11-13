CREATE OR REPLACE FUNCTION CalcularPrecioTotal(
    p_id_reserva INT
)
RETURNS DECIMAL AS $$
DECLARE
    v_duracion_segundos BIGINT;
    v_duracion_horas DECIMAL(10,2);
    v_precio_hora DECIMAL(10,2);
    v_precio_total DECIMAL(10,2);
BEGIN
    SELECT 
        EXTRACT(EPOCH FROM (r.fecha_fin - r.fecha_inicio)),
        rec.precio_hora
    INTO 
        v_duracion_segundos, 
        v_precio_hora
    FROM 
        reservas r
    JOIN 
        recursos rec ON r.id_recurso = rec.id_recurso
    WHERE 
        r.id_reserva = p_id_reserva;

    -- Verificar si se encontró la reserva
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Reserva con ID % no encontrada.', p_id_reserva;
    END IF;

    -- Convertir la duración de segundos a horas (DECIMAL)
    -- 3600 segundos por hora
    v_duracion_horas := v_duracion_segundos / 3600.0; 

    v_precio_total := v_duracion_horas * v_precio_hora;
    
    v_precio_total := ROUND(v_precio_total, 2);

    RETURN v_precio_total;
END;
$$ LANGUAGE plpgsql;