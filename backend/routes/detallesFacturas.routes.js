import express from 'express';
const router = express.Router();

import {getDetallesFacturas, getDetallesFacturaById, getDetallesFacturaByIdPago, createDetallesFactura, updateDetallesFactura  } from '../controllers/detallesFacturas.controller.js';
import { authMiddleware, isAdmin } from '../middleware/auth.middeware.js';

router.get('/detallesFacturas', getDetallesFacturas);
router.get('/detallesFacturas/:id', getDetallesFacturaById);
router.get('/detallesFacturas/:idPago', getDetallesFacturaByIdPago);
router.post('/detallesFacturas', createDetallesFactura);
router.put('/detallesFacturas', authMiddleware, isAdmin, updateDetallesFactura);

export default router;