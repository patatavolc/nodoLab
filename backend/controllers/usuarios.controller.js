import {newUsuario, getUsuariosService, getUsuarioByDNIService, updateUsuarioService} from '../services/usuarios.service.js';

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

//Obtener usuarios
export const getUsuarios = (req, res) => {
    getUsuariosService()
    .then((usuarios) => {
        res.send(usuarios);
    });
}

//Obtener usuario por dni
export const getUsuarioByDni = (req, res) => {
    const dni = req.body.dni;

    if(dni){
        getUsuarioByDNIService(dni)
        .then((usuario) => {
            res.status(200).send(usuario)
        })
        .catch((error) => {
            res.status(400).send({error: error.message})
        })
    } else {
        res.status(400).send({error:'Id incorrecto'});
    }
}

//Actualizar usuario
export const updateUsuario = (req, res) => {
    const data = req.body;
    const dniUsuario = req.params.dniUsuario

    updateReservaService(dniUsuario, data)
    .then((updatedUsuario) =>{
        res.status(200).send(updatedUsuario);
    })
    .catch((error) => {
        res.status(400).send({error: error.message});
    });
}