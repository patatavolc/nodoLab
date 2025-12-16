import {
    newReserva,
    getReservas as getAllReservas,
    getReservaById as getReservaIdService,
    getReservasByUsuario as getReservaDni,
    getReservasByRecurso as getReservaIdRecursoService,
    updateReserva as updateReservaService,
} from "../services/reservas.service.js";

// Validaciones
const validarReserva = (data, esActualizacion = false) => {
    // Validar DNI (solo si no es actualización o si se proporciona)
    if (!esActualizacion || data.id_usuario) {
        if (!data.id_usuario) {
            throw new Error("El DNI del usuario es obligatorio");
        }
        if (typeof data.id_usuario !== "string" || data.id_usuario.length !== 9) {
            throw new Error("DNI inválido: debe tener exactamente 9 caracteres");
        }
    }

    // Validar ID de recurso (solo si no es actualización o si se proporciona)
    if (!esActualizacion || data.id_recurso) {
        if (!data.id_recurso && !esActualizacion) {
            throw new Error("El ID del recurso es obligatorio");
        }
        if (data.id_recurso && (!Number.isInteger(Number(data.id_recurso)) || Number(data.id_recurso) <= 0)) {
            throw new Error("ID de recurso inválido: debe ser un número entero positivo");
        }
    }

    // Validar fechas
    if (data.fecha_inicio || data.fecha_fin) {
        // Validar formato de fechas
        if (data.fecha_inicio) {
            const fechaInicio = new Date(data.fecha_inicio);
            if (isNaN(fechaInicio.getTime())) {
                throw new Error("Formato de fecha_inicio inválido");
            }
        }

        if (data.fecha_fin) {
            const fechaFin = new Date(data.fecha_fin);
            if (isNaN(fechaFin.getTime())) {
                throw new Error("Formato de fecha_fin inválido");
            }
        }

        // Validar coherencia de fechas (si ambas están presentes)
        if (data.fecha_inicio && data.fecha_fin) {
            const fechaInicio = new Date(data.fecha_inicio);
            const fechaFin = new Date(data.fecha_fin);

            if (fechaFin <= fechaInicio) {
                throw new Error("Fechas incoherentes: fecha_fin debe ser posterior a fecha_inicio");
            }
        }
    }

    // Validar estado (si se proporciona)
    if (data.estado) {
        const estadosValidos = ["pendiente", "confirmada", "completada", "cancelada"];
        if (!estadosValidos.includes(data.estado)) {
            throw new Error(
                `Estado inválido: debe ser uno de ${estadosValidos.join(", ")}`
            );
        }
    }

    return true;
};

// Crear una reserva
export const createReserva = (req, res) => {
    const data = req.body;

    try {
        // Validar datos antes de crear la reserva
        validarReserva(data);

        newReserva(data)
            .then((newReservaService) => {
                res.status(201).send(newReservaService);
            })
            .catch((error) => {
                res.status(500).send({ error: error.message });
            });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

//Obtener reservas
export const getReservas = (req, res) => {
    getAllReservas()
        .then((reservas) => {
            res.send(reservas);
        })
        .catch((error) => {
            res.status(500).send({ error: error.message });
        });
};

//Obtener reserva por id
export const getReservaId = (req, res) => {
    const id = req.body.id;

    if (id) {
        getReservaIdService(id)
            .then((reservas) => {
                res.status(200).send(reservas);
            })
            .catch((error) => {
                res.status(400).send({ error: error.message });
            });
    } else {
        res.status(400).send({ error: "Id incorrecto" });
    }
};

// Obtener reserva por dni
export const getReservaByDni = (req, res) => {
    const dni = req.body.dni;

    if (dni) {
        getReservaDni(dni)
            .then((reservas) => {
                res.status(200).send(reservas);
            })
            .catch((error) => {
                res.status(400).send({ error: error.message });
            });
    } else {
        res.status(400).send({ error: "Dni erroneo" });
    }
};

//Obtener reserva por id
export const getReservaByRecurso = (req, res) => {
    const idRecurso = req.body.idRecurso;

    if (idRecurso) {
        getReservaIdRecursoService(idRecurso)
            .then((reservas) => {
                res.status(200).send(reservas);
            })
            .catch((error) => {
                res.status(400).send({ error: error.message });
            });
    } else {
        res.status(400).send({ error: "Id incorrecto" });
    }
};

//Obtener reservas por fecha
export const getReservaByFecha = (req, res) => {
    const fechaReserva = req.body.fecha_inicio;

    if (fechaReserva) {
        getReservaFechaService(fechaReserva)
            .then((reservas) => {
                res.status(200).send(reservas);
            })
            .catch((error) => {
                res.status(400).send({ error: error.message });
            });
    } else {
        res.status(400).send({ error: "Fecha erronea" });
    }
};

// Crear reserva
export const postReserva = (req, res) => {
    const data = req.body;

    try {
        // Validar datos antes de crear la reserva
        validarReserva(data);

        newReserva(data)
            .then((newReserva) => {
                res.status(201).send(newReserva);
            })
            .catch((error) => {
                res.status(500).send({ error: error.message });
            });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

//Actualizar reserva
export const updateReserva = (req, res) => {
    const data = req.body;
    const id_reserva = req.params.id_reserva;

    updateReservaService(id_reserva, data)
        .then((updatedReserva) => {
            res.status(200).send(updatedReserva);
        })
        .catch((error) => {
            res.status(400).send({ error: error.message });
        });
};
