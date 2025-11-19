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