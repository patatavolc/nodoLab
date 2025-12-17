export function errorHandler(err, req, res, next) {
    console.error("Error capturado", err.stack);

    // Errores de Postgres
    if (err.code === "23505") {
        return res.status(409).json({
            error: "El registro ya existe (dato duplicado)",
            detalle: err.detail, // Para ver que campo fallo
        });
    }

    // Errores manuales (throw new Error)
    if (
        err.message.includes("obligatorio") ||
        err.message.includes("inválido") ||
        err.message.includes("incorrecto")
    ) {
        return res.status(400).json({ error: err.message });
    }

    // Errores por defecto (500)
    res.status(500).json({
        error: "Error interno del servidor. Por favor intenta mas tarde",
    });
}
