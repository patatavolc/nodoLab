import {newUsuario} from '../services/usuarios.service.js';

export const createUsuario = (req, res) => {
    const data = req.body;

    if(data.id_usuario_dni) {
        newUsuario(data)
            .then((newCreateUsuario) => {
                res.status(200).send(newCreateUsuario);
            })
            .catch((error) => {
                res.status(400).send({error: error.message});
            });
        } else {
            res.status(400).send({error: 'Faltan datos obligatorios'});
        }
}