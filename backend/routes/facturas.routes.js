import express from 'express';
const router = express.Router();

import {getFacturas, getPagoById, getFacturaByFecha,  getReservasByTipo, createFactura, updateFactura } from '../controllers/facturas.controller.js';

router.get('/facturas', getFacturas);
router.get('/factura/:id', getPagoById);
router.get('/factura/:fecha', getFacturaByFecha);
router.get('/factura/:tipo', getReservasByTipo);
router.post('/factura', createFactura);
router.put('/factura', updateFactura);

export default router;