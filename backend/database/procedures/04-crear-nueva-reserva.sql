CREATE OR REPLACE PROCEDURE CrearNuevaReserva (
    p_id_usuario VARCHAR(9),
    p_id_recurso INT,
    p_fecha_inicio TIMESTAMP WITH TIME ZONE,
    p_fecha_fin TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
AS $$
BEGIN

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