import express from 'express';
const router = express.Router();

import {getFacturas, getFacturaById, getFacturaByFecha,  getFacturasByTipo, createFactura, updateFactura } from '../controllers/facturas.controller.js';
import { authMiddleware, isAdmin } from '../middleware/auth.middeware.js';

router.get('/factura/:id', getFacturaById);
router.get('/factura/:fecha', getFacturaByFecha);
router.get('/factura/:tipo', getFacturasByTipo);
router.get('/facturas', getFacturas);
router.post('/factura', createFactura);
router.put('/factura', authMiddleware, isAdmin, updateFactura);

export default router;