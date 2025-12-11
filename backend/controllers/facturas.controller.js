import {
    newFactura,
    getFacturas as getAllFacturas,
    getFacturasById as getFacturaByIdService,
    updateFactura as updateFacturaService,
} from "../services/facturas.service.js";

//Crear Factura
export const createFactura = (req, res) => {
    const data = req.body;

    if (data.id_reserva) {
        newFactura(data)
            .then((newFactura) => {
                res.status(201).send(newFactura);
            })
            .catch((error) => {
                res.stauts(400).send({ error: error.message });
            });
    } else {
        res.status(400).send({ error: "Faltan datos obligatorios" });
    }
};

// obtener facturas
export const getFacturas = (req, res) => {
    getAllFacturas()
        .then((facturas) => {
            res.send(facturas);
        })
        .catch((error) => {
            res.status(500).send({ error: error.message });
        });
};

//Obtener Factura por id
export const getFacturaById = (req, res) => {
    const id = req.params.id;

    if (id) {
        getFacturaByIdService(id)
            .then((factura) => {
                res.status(201).send(factura);
            })
            .catch((error) => {
                res.status(400).send({ error: error.message });
            });
    } else {
        res.status(400).send({ error: "Faltan datos obligatorios" });
    }
};

//Obtener Factura por fecha
export const getFacturaByFecha = (req, res) => {
    const fechaFactura = req.body.fechaFactura;

    if (idReserva) {
        getFacturaByFechaService(fechaFactura)
            .then((factura) => {
                res.status(200).send(factura);
            })
            .catch((error) => {
                res.status(400).send({ error: error.message });
            });
    } else {
        res.status(400).send({ error: "Faltan datos obligatorios" });
    }
};

//Obtener facturas por metodo de Factura
export const getFacturasByTipo = (req, res) => {
    const metodoFactura = req.params.metodoFactura;

    getFacturasByTipoService(metodoFactura)
        .then((facturas) => {
            res.status(200).send(facturas);
        })
        .catch((error) => {
            res.status(400).send({ error: error.message });
        });
};

//Actualizar facturas
export const updateFactura = (req, res) => {
    const data = req.body;
    const idFactura = req.params.idFactura;

    updateFacturaService(idFactura, data)
        .then((updatedFactura) => {
            res.status(200).send(updatedFactura);
        })
        .catch((error) => {
            res.status(400).send({ error: error.message });
        });
};
