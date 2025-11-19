CREATE OR REPLACE PROCEDURE CrearUsuario (
    p_dni VARCHAR(9),
    p_rol VARCHAR(50),
    p_nombre_completo VARCHAR(150),
    p_username VARCHAR(100),
    p_telefono VARCHAR(20),
    p_email VARCHAR(100),
    p_password_hash VARCHAR(255),
    p_salt VARCHAR(32)
)
LANGUAGE plpgsql
AS $$
BEGIN

    INSERT INTO usuarios (
        id_usuario_dni, rol, nombre_completo, username, telefono, email,
        password_hash, salt
    )
    VALUES (
        p_dni, p_rol, p_nombre_completo, p_username, p_telefono, p_email,
        p_password_hash, p_salt
    );
END;
$$;