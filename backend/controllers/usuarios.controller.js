import {
    newUsuario,
    getUsuariosService,
    getUsuarioByDNIService,
    updateUsuarioService,
} from "../services/usuarios.service.js";

export const createUsuario = (req, res, next) => {
    const data = req.body;

    if (data.id_usuario_dni) {
        newUsuario(data)
            .then((newCreateUsuario) => {
                res.status(200).send(newCreateUsuario);
            })
            .catch(next);
    } else {
        next(new Error("Faltan datos obligatorios"));
    }
};

//Obtener usuarios
export const getUsuarios = (req, res, next) => {
    getUsuariosService()
        .then((usuarios) => {
            res.send(usuarios);
        })
        .catch(next);
};

//Obtener usuario por dni
export const getUsuarioByDni = (req, res, next) => {
    const dni = req.body.dni;

    if (dni) {
        getUsuarioByDNIService(dni)
            .then((usuario) => {
                res.status(200).send(usuario);
            })
            .catch(next);
    } else {
        next(new Error("DNI incorrecto o faltante"));
    }
};

//Actualizar usuario
export const updateUsuario = (req, res, next) => {
    const data = req.body;
    const dniUsuario = req.params.dniUsuario;

    updateUsuarioService(dniUsuario, data)
        .then((updatedUsuario) => {
            res.status(200).send(updatedUsuario);
        })
        .catch(next);
};
