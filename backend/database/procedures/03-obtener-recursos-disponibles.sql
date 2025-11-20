CREATE OR REPLACE FUNCTION ObtenerRecursosDisponibles (
    p_fecha_inicio TIMESTAMP WITH TIME ZONE,
    p_fecha_fin TIMESTAMP WITH TIME ZONE
)
/*SETOF: Establece el tipo de salida, indicando que devolverá un conjunto de filas*/
RETURNS SETOF recursos 
LANGUAGE plpgsql
AS $$
BEGIN

    RETURN QUERY
    SELECT 
    r.* 
    FROM recursos r

    /*Excluye el recurso mantenimiento*/
    WHERE r.estado <> 'mantenimiento'
    AND r.id_recurso NOT IN (
        SELECT 
        id_recurso 
        FROM reservas 
        WHERE 
        /*Considera como ocupadas las reservas activas*/
            estado IN ('pendiente', 'confirmada') 
            /*Impone que no se pueda crear una nueva reserva durante el proceso*/
            AND 
            fecha_inicio < p_fecha_fin 
            AND 
            fecha_fin > p_fecha_inicio
    );
END;
$$;