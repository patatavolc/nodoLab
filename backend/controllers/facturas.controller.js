import {
    newFactura,
    getFacturas as getAllFacturas,
    getFacturasById as getFacturaByIdService,
    updateFactura as updateFacturaService,
} from "../services/facturas.service.js";

//Crear Factura
export const createFactura = (req, res, next) => {
    const data = req.body;

    if (data.id_reserva) {
        newFactura(data)
            .then((newFactura) => {
                res.status(201).send(newFactura);
            })
            .catch(next);
    } else {
        return next(new Error("Faltan datos obligatorios"));
    }
};

// obtener facturas
export const getFacturas = (req, res, next) => {
    getAllFacturas()
        .then((facturas) => {
            res.send(facturas);
        })
        .catch(next);
};

//Obtener Factura por id
export const getFacturaById = (req, res, next) => {
    const id = req.params.id;

    if (id) {
        getFacturaByIdService(id)
            .then((factura) => {
                res.status(201).send(factura);
            })
            .catch(next);
    } else {
        return next(new Error("Faltan datos obligatorios"));
    }
};

//Obtener Factura por fecha
export const getFacturaByFecha = (req, res, next) => {
    const fechaFactura = req.body.fechaFactura;

    if (idReserva) {
        getFacturaByFechaService(fechaFactura)
            .then((factura) => {
                res.status(200).send(factura);
            })
            .catch(next);
    } else {
        return next(new Error("Faltan datos obligatorios"));
    }
};

//Obtener facturas por metodo de Factura
export const getFacturasByTipo = (req, res, next) => {
    const metodoFactura = req.params.metodoFactura;

    getFacturasByTipoService(metodoFactura)
        .then((facturas) => {
            res.status(200).send(facturas);
        })
        .catch(next);
};

//Actualizar facturas
export const updateFactura = (req, res, next) => {
    const data = req.body;
    const idFactura = req.params.idFactura;

    updateFacturaService(idFactura, data)
        .then((updatedFactura) => {
            res.status(200).send(updatedFactura);
        })
        .catch(next);
};
