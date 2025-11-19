import {newDatoBancario} from '../services/datosBancarios.service.js';

//Crear dato bancario
export const createDatoBancario = (req, res) => {
    const data = req.body;

    if(data.id_usuario){
        newDatoBancario(data)
            .then((newDatoBancarioService) => {
                res.status(200).send(newDatoBancarioService);
            })
            .catch((error) => {
                res.status(400).send({error: error.message});
            });
            
    } else{
        res.status(400).send({error: 'Faltan datos obligatorios'});
    }
}