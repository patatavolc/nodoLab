import express from 'express';
const router = express.Router();

import { getReservas, getReservaId, getReservaByDni, postReserva, updateReserva, getReservaByFecha, getReservaByRecurso} from '../controllers/reservas.controller.js'; 

router.get('/reservas', getReservas);
router.get('/reservas/:id', getReservaId);
router.get('/reservas/usuario/:dni', getReservaByDni);
router.get('/reservas/recurso/:idRecurso', getReservaByRecurso);
router.get('/reservas/fecha/:fecha', getReservaByFecha);
router.post('/reservas', postReserva);
router.put('/reservas', updateReserva);

export default router;