import express from 'express';
const router = express.Router();

import {getFacturas, getFacturaById, getFacturaByFecha,  getFacturaByTipo, createFactura, updateFactura } from '../controllers/facturas.controller.js';

router.get('/facturas', getFacturas);
router.get('/factura/:id', getFacturaById);
router.get('/factura/:fecha', getFacturaByFecha);
router.get('/factura/:tipo', getFacturaByTipo);
router.post('/factura', createFactura);
router.put('/factura', updateFactura);

export default router;