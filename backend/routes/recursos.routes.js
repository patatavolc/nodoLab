import express from 'express'; 
const router = express.Router();

import { getRecursos, getRecursoById, createRecurso, updateRecurso, getRecursosByTipo} from '../controllers/recursos.controller.js'; 

router.get('/recursos', getRecursos);
router.get('/recursos/:id', getRecursoById);
router.get('/recursos/:tipo', getRecursosByTipo);
router.post('/recursos', createRecurso);
router.put('/recursos/:id', updateRecurso);

export default router;