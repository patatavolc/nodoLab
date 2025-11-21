CREATE OR REPLACE PROCEDURE GestionarMantenimientoRecurso(
    p_id_recurso INT,
    p_nuevo_estado VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_conteo_reservas INT;
BEGIN

    IF p_nuevo_estado NOT IN ('mantenimiento', 'disponible') THEN
        RAISE EXCEPTION 'Error: Solo se permite cambiar el recurso a los estados "mantenimiento" o "disponible".';
    END IF;

    IF p_nuevo_estado = 'mantenimiento' THEN
        SELECT COUNT(*)
        INTO v_conteo_reservas
        FROM reservas
        WHERE 
            id_recurso = p_id_recurso
            AND estado = 'confirmada'
            AND fecha_fin > CURRENT_TIMESTAMP;
            
        IF v_conteo_reservas > 0 THEN
            RAISE EXCEPTION 'Error: El Recurso ID % tiene % reservas confirmadas futuras. Cancele o reubique estas reservas antes de ponerlo en mantenimiento.', p_id_recurso, v_conteo_reservas;
        END IF;
    END IF;

    UPDATE recursos
    SET 
        estado = p_nuevo_estado
    WHERE 
        id_recurso = p_id_recurso;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Error: Recurso con ID % no encontrado.', p_id_recurso;
    END IF;

    RAISE NOTICE 'Recurso ID % actualizado exitosamente al estado: %.', p_id_recurso, p_nuevo_estado;

END;
$$;