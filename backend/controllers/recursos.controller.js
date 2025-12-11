import {
    newRecurso,
    getAllRecursosService,
    getRecursoByIdService,
    getRecursosByTipoService,
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
        getRecursoByIdService()
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
    const idRecurso = req.params.idRecurso;

    if (idRecurso) {
        getRecursosByTipoService()
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

    updatePagoService(idRecurso, data)
        .then((updatedRecurso) => {
            res.status(200).send(updatedRecurso);
        })
        .catch((error) => {
            res.status(400).send({ error: error.message });
        });
};
