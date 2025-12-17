import express from "express";
const router = express.Router();

import {
    getRecursos,
    getRecursoById,
    createRecurso,
    updateRecurso,
    getRecursosByTipo,
    getRecursosDisponibles,
} from "../controllers/recursos.controller.js";

router.get("/recursos", getRecursos);
router.get("/recursos/disponibles", getRecursosDisponibles);

router.get("/recursos/tipo/:tipo", getRecursosByTipo);
router.get("/recursos/:id", getRecursoById);

router.post("/recursos", createRecurso);
router.put("/recursos/:id", updateRecurso);

export default router;
