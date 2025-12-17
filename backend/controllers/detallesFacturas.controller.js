// import {
//     newDetallesFactura,
//     getAllDetallesFacturas,
//     getDetallesFacturaById,
//     getDetallesFacturaByIdPago,
//     updateDetallesFactura
// } from '../services/detallesFacturas.services.js';

//Crear factura
export const createDetallesFactura = (req, res, next) => {
    const data = req.body;

    if (data.id_factura) {
        newDetallesFacturaService(data)
            .then((detallesFactura) => {
                res.status(201).send(detallesFactura);
            })
            .catch(next);
    } else {
        return next(new Error("Faltan datos obligatorios"));
    }
};

//Obtener todos detalles de facturas
export const getDetallesFacturas = (req, res, next) => {
    getAllDetallesFacturasService()
        .then((detallesFactura) => {
            res.send(detallesFactura);
        })
        .catch(next);
};

//Obtener detalles factura por id
export const getDetallesFacturaById = (req, res, next) => {
    const idDetalleFactura = req.params.idDetalleFactura;

    if (id) {
        getDetallesFacturaByIdService()
            .then((detallesFactura) => {
                res.status(200).send(detallesFactura);
            })
            .catch(next);
    } else {
        return next(new Error("Faltan datos obligatorios"));
    }
};

//Obtener detalles by id Pago
export const getDetallesFacturaByIdPago = (req, res, next) => {
    const idPago = req.params.idPago;

    if (id) {
        getDetallesFacturaByIdPagoService()
            .then((idPago) => {
                res.status(200).send(idPago);
            })
            .catch(next);
    } else {
        return next(new Error("Faltan datos obligatorios"));
    }
};

//Actualizar detalles facturas
export const updateDetallesFactura = (req, res, next) => {
    const data = req.body;
    const idDetallesFactura = req.params.idDetallesFactura;

    updateDetallesFacturaService(idDetallesFactura, data)
        .then((updatedDetallesFactura) => {
            res.status(200).send(updatedDetallesFactura);
        })
        .catch(next);
};
