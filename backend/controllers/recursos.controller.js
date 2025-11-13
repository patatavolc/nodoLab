import { newRecurso } from "../services/recursos.service.js";

//Crear nuevo recurso
export const createRecurso = (req, res) => {
    const data = req.body;

    if(data.nombre){
        newRecurso(data)
            .then((newRecursoService) => {
                res.status(200).send(newRecursoService);
            })
            .catch((error) => {
                res.status(400).send({error: error.message});
            });
    }else {
        res.status(400).send({error: 'Faltan datos obligatorios'});
    }
}