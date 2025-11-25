import {newPago} from '../services/pagos.service.js';

//Crear nuevo pago
export const createPago = (req, res) => {
    const data = req.body;

    if(data.id_reserva){
        newPago(data)
            .then((newPagoService) => {
                res.status(200).send(newPagoService);
            })
            .catch((error) => {
                res.status(400).send({error: error.message});
            });
    }else {
        res.status(400).send({error: 'Faltan datos obligatorios'});
    }
}

//Obtener todos pagos
export const getPagos = (req,res) => {

    getAllPagos()
        .then((pagos) =>{
            res.send(pagos);
        });
}

//Obtener pago por id
export const getPagoById = (req, res) => {
    const idPago = req.params.idPago;

    if(idPago){

        getPagoByIdService()
            .then((pago) =>{
                res.status(200).send(pago);
            })
            .catch((error) => {
                res.status(400).send({error: error.message});
            })
        } else {
            res.status(400).send({error:'Faltan datos obligatorios'});
    }
}

//Obtener pago by id reserva
export const getPagoByIdReserva = (req, res) => {
    const idReserva= req.params.idReserva;

    if(idReserva){
        getPagoByIdReservaService()
            .then((pago) =>{
                res.status(200).send(pago);
            })
            .catch((error) => {
                res.status(400).send({error: error.message});
            })
        } else {
            res.status(400).send({error:'Faltan datos obligatorios'});
    }
}
//Obtener pago by metodo
export const getPagosByMetodoPago = (req, res) => {
    const metodoPago= req.params.metodoPago;

    if(metodoPago){
        getPagoByMetodoService()
            .then((pago) =>{
                res.status(200).send(pago);
            })
            .catch((error) => {
                res.status(400).send({error: error.message});
            })
        } else {
            res.status(400).send({error:'Faltan datos obligatorios'});
    }
}

//Actualizar pago
export const updatePago = (req, res) => {
    const data = req.body;
    const idPago = req.params.idPago;

    updatePagoService(idPago, data)
        .then((updatedPago) =>{
            res.status(200).send(updatedPago);
        })
        .catch((error) => {
            res.status(400).send({error: error.message});
        });
}