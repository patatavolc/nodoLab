import {
    newDatoBancario,
    getDatosBancariosService,
    getDatosBancariosByDniService,
    updateDatosBancariosService,
    eliminarDatoBancario,
} from "../services/datosBancarios.service.js";

//Crear dato bancario
export const createDatoBancario = (req, res, next) => {
    const data = req.body;

    if (data.id_usuario) {
        newDatoBancario(data)
            .then((newDatoBancarioService) => {
                res.status(200).send(newDatoBancarioService);
            })
            .catch(next);
    } else {
        return next(new Error("Faltan datos obligatorios"));
    }
};

//Obtener detos bancarios
export const getDatosBancarios = (req, res, next) => {
    getDatosBancariosService()
        .then((detatosBancarios) => {
            res.status(200).send(detatosBancarios);
        })
        .catch(next);
};

//Obtener detos bancarios por id
export const getDatosBancariosByDni = (req, res, next) => {
    const dni = req.params.dni;

    if (dni) {
        getDatosBancariosByDniService(dni)
            .then((detatosBancarios) => {
                res.status(200).send(detatosBancarios);
            })
            .catch(next);
    } else {
        return next(new Error("Faltan datos obligatorios"));
    }
};

//Actualizar datos bancarios
export const updateDatosBancarios = (req, res, next) => {
    const data = req.body;
    const idDatosBancarios = req.params.idDatosBancarios;

    updateDatosBancariosService(idDatosBancarios, data)
        .then((updatedDatosBancarios) => {
            res.status(200).send(updatedDatosBancarios);
        })
        .catch(next);
};

// Eliminar dato bancario
export const deleteDatoBancario = (req, res, next) => {
    const idDatoBancario = req.params.idDatoBancario;

    if (idDatoBancario) {
        eliminarDatoBancario(idDatoBancario)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch(next);
    } else {
        return next(new Error("Faltan datos obligatorios"));
    }
};
