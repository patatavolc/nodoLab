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

//Obtener detos bancarios 
export const getDatosBancarios = (req, res) => {
    
        getDatosBancariosService()
            .then((detatosBancarios) =>{
                res.status(200).send(detatosBancarios);
            })
            .catch((error) => {
                res.status(500).send({error: error.message});
            })
}

//Obtener detos bancarios por id
export const getDatosBancariosByDni = (req, res) => {
    const dni = req.params.dni;

    if(dni){

        getDatosBancariosByDniService()
            .then((detatosBancarios) =>{
                res.status(200).send(detatosBancarios);
            })
            .catch((error) => {
                res.status(400).send({error: error.message});
            })
        } else {
            res.status(400).send({error:'Faltan datos obligatorios'});
    }
}


//Actualizar datos bancarios
export const updateDatosBancarios = (req, res) => {
    const data = req.body;
    const idDatosBancarios = req.params.idDatosBancarios;

    updateDetallesFacturaService(idDatosBancarios, data)
        .then((updatedDetosBancarios) =>{
            res.status(200).send(updatedDetosBancarios);
        })
        .catch((error) => {
            res.status(400).send({error: error.message});
        });
}