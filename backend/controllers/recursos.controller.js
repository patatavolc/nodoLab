import {
    newRecurso,
    getAllRecursosService,
    getRecursoByIdService,
    getRecursosByTipoService,
    updateRecurso as updaterecursoService,
    getRecursosDisponiblesService,
} from "../services/recursos.service.js";

//Crear nuevo recurso
export const createRecurso = (req, res, next) => {
    const data = req.body;

    if (data.nombre) {
        newRecurso(data)
            .then((newRecursoService) => {
                res.status(200).send(newRecursoService);
            })
            .catch(next);
    } else {
        next(new Error("Faltan datos obligatorios"));
    }
};

//Obtener todos recursos
export const getRecursos = (req, res, next) => {
    getAllRecursosService()
        .then((recursos) => {
            res.send(recursos);
        })
        .catch(next);
};

//Obtener recurso por id
export const getRecursoById = (req, res, next) => {
    const id = req.params.id;

    if (id) {
        getRecursoByIdService(id)
            .then((recurso) => {
                res.status(200).send(recurso);
            })
            .catch(next);
    } else {
        next(new Error("Faltan datos obligatorios"));
    }
};

//Obtener recurso by id tipo
export const getRecursosByTipo = (req, res, next) => {
    const tipo = req.params.tipo;

    if (tipo) {
        getRecursosByTipoService(tipo)
            .then((recurso) => {
                res.status(200).send(recurso);
            })
            .catch(next);
    } else {
        next(new Error("Faltan datos obligatorios"));
    }
};

//Actualizar recurso
export const updateRecurso = (req, res, next) => {
    const data = req.body;
    const idRecurso = req.params.idRecurso;

    updateRecursoService(idRecurso, data)
        .then((updatedRecurso) => {
            res.status(200).send(updatedRecurso);
        })
        .catch(next);
};

export const getRecursosDisponibles = async (req, res, next) => {
    try {
        const { fecha_inicio, fecha_fin } = req.query;

        // Validacion
        if (!fecha_inicio || !fecha_fin) {
            return next(new Error("Se requiere de fecha_inicio y fecha_fin"));
        }

        const recursos = await getRecursosDisponiblesService(fecha_inicio, fecha_fin);
        res.status(200).json(recursos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
