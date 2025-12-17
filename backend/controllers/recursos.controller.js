import {
    newRecurso,
    getAllRecursosService,
    getRecursoByIdService,
    getRecursosByTipoService,
    updateRecurso,
    getRecursosDisponiblesService,
} from "../services/recursos.service.js";

//Crear nuevo recurso
export const createRecurso = (req, res) => {
    const data = req.body;

    if (data.nombre) {
        newRecurso(data)
            .then((newRecursoService) => {
                res.status(200).send(newRecursoService);
            })
            .catch((error) => {
                res.status(400).send({ error: error.message });
            });
    } else {
        res.status(400).send({ error: "Faltan datos obligatorios" });
    }
};

//Obtener todos recursos
export const getRecursos = (req, res) => {
    getAllRecursosService()
        .then((recursos) => {
            res.send(recursos);
        })
        .catch((error) => {
            res.status(500).send({ error: error.message });
        });
};

//Obtener recurso por id
export const getRecursoById = (req, res) => {
    const idRecurso = req.params.idRecurso;

    if (idRecurso) {
        getRecursoByIdService(idRecurso)
            .then((recurso) => {
                res.status(200).send(recurso);
            })
            .catch((error) => {
                res.status(400).send({ error: error.message });
            });
    } else {
        res.status(400).send({ error: "Faltan datos obligatorios" });
    }
};

//Obtener recurso by id tipo
export const getRecursosByTipo = (req, res) => {
    const tipo = req.params.tipo;

    if (tipo) {
        getRecursosByTipoService(tipo)
            .then((recurso) => {
                res.status(200).send(recurso);
            })
            .catch((error) => {
                res.status(400).send({ error: error.message });
            });
    } else {
        res.status(400).send({ error: "Faltan datos obligatorios" });
    }
};

//Actualizar recurso
export const updateRecurso = (req, res) => {
    const data = req.body;
    const idRecurso = req.params.idRecurso;

    updateRecurso(idRecurso, data)
        .then((updatedRecurso) => {
            res.status(200).send(updatedRecurso);
        })
        .catch((error) => {
            res.status(400).send({ error: error.message });
        });
};

export const getRecursosDisponibles = async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin } = req.query;

        // Validacion
        if (!fecha_inicio || !fecha_fin) {
            return res.status(400).json({ error: "Se requiere de fecha_inicio y fecha_fin" });
        }

        const recursos = await getRecursosDisponiblesService(fecha_inicio, fecha_fin);
        res.status(200).json(recursos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
