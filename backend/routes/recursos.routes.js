import express from 'express'; 
const router = express.Router();

import { getRecursos, getRecursoById, createRecurso, updateRecurso, getRecursosByTipo} from '../controllers/recursos.controller.js'; 
import { authMiddleware, isAdmin } from '../middleware/auth.middeware.js';

router.get('/recursos', getRecursos);
router.get('/recursos/:id', getRecursoById);
router.get('/recursos/tipo/:tipo', getRecursosByTipo);
router.post('/recursos', createRecurso);
router.put('/recursos/:id',authMiddleware, isAdmin, updateRecurso);

export default router;