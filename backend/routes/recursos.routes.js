import express from 'express'; 
const router = express.Router();

import { getRecursos, getRecursosById, createRecursos, updateRecursos, getRecursosByTipo} from '../controllers/recursos.controller.js'; 

router.get('/recursos', getRecursos);
router.get('/recursos/:id', getRecursosById);
router.get('/recursos/:tipo', getRecursosByTipo);
router.post('/recursos', createRecursos);
router.put('/recursos/:id', updateRecursos);

export default router;