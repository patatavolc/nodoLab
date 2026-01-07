import express from 'express';
const router = express.Router();

import { getReservas, getReservaId, getReservaByDni, postReserva, updateReserva, getReservaByFecha, getReservaByRecurso} from '../controllers/reservas.controller.js'; 
import { authMiddleware, isAdmin } from '../middleware/auth.middeware.js';

router.get('/reservas/:id', getReservaId);
router.get('/reservas/usuario/:dni', getReservaByDni);
router.get('/reservas/recurso/:idRecurso', getReservaByRecurso);
router.get('/reservas/fecha/:fecha', getReservaByFecha);
router.get('/reservas', getReservas);
router.post('/reservas', postReserva);
router.put('/reservas', authMiddleware, isAdmin, updateReserva);

export default router;