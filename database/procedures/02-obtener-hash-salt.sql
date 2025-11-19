CREATE OR REPLACE FUNCTION ObtenerHashSalt (
    p_username_o_email VARCHAR
)
RETURNS TABLE (
    user_hash VARCHAR,
    user_salt VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Busca por el nombre de usuario O por el correo electrónico
    RETURN QUERY
    SELECT 
        u.password_hash,
        u.salt
    FROM usuarios u
    WHERE u.username = p_username_o_email 
       OR u.email = p_username_o_email
    LIMIT 1;
END;
$$;