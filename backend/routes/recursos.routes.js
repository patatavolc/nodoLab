import express from "express";
const router = express.Router();

import { getRecursos, getRecursoById, createRecurso, updateRecurso, getRecursosByTipo, getRecursosDisponibles} from '../controllers/recursos.controller.js'; 
import { authMiddleware, isAdmin } from '../middleware/auth.middeware.js';

router.get('/recursos/tipo/:tipo', getRecursosByTipo);
router.get('/recursos/:id', getRecursoById);
router.put('/recursos/:id',authMiddleware, isAdmin, updateRecurso);
router.get('/recursos', getRecursos);
router.post('/recursos', createRecurso);
router.get("/recursos/disponibles", getRecursosDisponibles);

export default router;
