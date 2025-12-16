import {
    newPago,
    obtenerPagos,
    obtenerPagoPorId,
    actualizarPago,
    existePagoParaReserva,
} from "../services/pagos.service.js";

//Crear nuevo pago
export const createPago = (req, res) => {
    const data = req.body;

    if (data.id_reserva) {
        newPago(data)
            .then((newPagoService) => {
                res.status(200).send(newPagoService);
            })
            .catch((error) => {
                res.status(400).send({ error: error.message });
            });
    } else {
        res.status(400).send({ error: "Faltan datos obligatorios" });
    }
};

//Obtener todos pagos
export const getPagos = (req, res) => {
    obtenerPagos()
        .then((pagos) => {
            res.send(pagos);
        })
        .catch((error) => {
            res.status(500).send({ error: error.message });
        });
};

//Obtener pago por id
export const getPagoById = (req, res) => {
    const idPago = req.params.idPago;

    if (idPago) {
        obtenerPagoPorId(idPago)
            .then((pago) => {
                res.status(200).send(pago);
            })
            .catch((error) => {
                res.status(400).send({ error: error.message });
            });
    } else {
        res.status(400).send({ error: "Faltan datos obligatorios" });
    }
};

//Obtener pago by id reserva
export const getPagoByIdReserva = (req, res) => {
    const idReserva = req.params.idReserva;

    if (idReserva) {
        existePagoParaReserva(idReserva)
            .then((pago) => {
                res.status(200).send(pago);
            })
            .catch((error) => {
                res.status(400).send({ error: error.message });
            });
    } else {
        res.status(400).send({ error: "Faltan datos obligatorios" });
    }
};

//Obtener pago by metodo
export const getPagosByMetodoPago = (req, res) => {
    const metodoPago = req.params.metodoPago;

    if (metodoPago) {
        getPagoByMetodoService(metodoPago)
            .then((pago) => {
                res.status(200).send(pago);
            })
            .catch((error) => {
                res.status(400).send({ error: error.message });
            });
    } else {
        res.status(400).send({ error: "Faltan datos obligatorios" });
    }
};

//Actualizar pago
export const updatePago = (req, res) => {
    const data = req.body;
    const idPago = req.params.idPago;

    actualizarPago(idPago, data)
        .then((updatedPago) => {
            res.status(200).send(updatedPago);
        })
        .catch((error) => {
            res.status(400).send({ error: error.message });
        });
};
