//import {} from '../services/detallesFacturas.services.js';

//Crear factura
export const createDetallesFactura = (req, res) => {
    const data = req.body;

    if (data.id_factura) {
        newDetallesFacturaService(data)
            .then((detallesFactura) => {
                res.status(201).send(detallesFactura);
            })
            .catch((error) => {
                res.status(400).send({ error: error.message });
            });
    } else {
        res.status(400).send({ error: "Faltan datos obligatorios" });
    }
};

//Obtener todos detalles de facturas
export const getDetallesFacturas = (req, res) => {
    getAllDetallesFacturasService()
        .then((detallesFactura) => {
            res.send(detallesFactura);
        })
        .catch((error) => {
            res.status(500).send({ error: error.message });
        });
};

//Obtener detalles factura por id
export const getDetallesFacturaById = (req, res) => {
    const idDetalleFactura = req.params.idDetalleFactura;

    if (id) {
        getDetallesFacturaByIdService()
            .then((detallesFactura) => {
                res.status(200).send(detallesFactura);
            })
            .catch((error) => {
                res.status(400).send({ error: error.message });
            });
    } else {
        res.status(400).send({ error: "Faltan datos obligatorios" });
    }
};

//Obtener detalles by id Pago
export const getDetallesFacturaByIdPago = (req, res) => {
    const idPago = req.params.idPago;

    if (id) {
        getDetallesFacturaByIdPagoService()
            .then((idPago) => {
                res.status(200).send(idPago);
            })
            .catch((error) => {
                res.status(400).send({ error: error.message });
            });
    } else {
        res.status(400).send({ error: "Faltan datos obligatorios" });
    }
};

//Actualizar detalles facturas
export const updateDetallesFactura = (req, res) => {
    const data = req.body;
    const idDetallesFactura = req.params.idDetallesFactura;

    updateDetallesFacturaService(idDetallesFactura, data)
        .then((updatedDetallesFactura) => {
            res.status(200).send(updatedDetallesFactura);
        })
        .catch((error) => {
            res.status(400).send({ error: error.message });
        });
};
