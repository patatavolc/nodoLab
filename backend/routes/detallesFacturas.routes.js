import express from 'express';
const router = express.Router();

import {getDetallesFacturas, getDetallesFacturasById, getDetallesFacturasByIdPago, getDetallesFacturasaByTotal, createDetallesFacturas, updateDetallesFacturas  } from '../controllers/detallesFacturas.controller.js';

router.get('/detallesFacturas', getDetallesFacturas);
router.get('/detallesFacturas/:id', getDetallesFacturasById);
router.get('/detallesFacturas/:idPago', getDetallesFacturasByIdPago);
router.get('/detallesFacturas/:total', getDetallesFacturasaByTotal);
router.post('/detallesFacturas', createDetallesFacturas);
router.put('/detallesFacturas', updateDetallesFacturas);

export default router;