import express from 'express';
const router = express.Router();

import {} from '../controllers/mensajes.controller.js';

router.get('/mensajes', getMensajes);
router.get('/mensajes/:id', getMensajesById);
router.get('/mensajes/:idEmisor', getMensajesByIdEmisor);
router.get('/mensajes/:idReceptor', getMensajesByIdReceptor);
router.get('/mensajes/:fecha', getMensajesByFecha);
router.post('/mensajes', createDetallesFacturas);
//router.put('/mensajes', updateDetallesFacturas);

export default router;