import express from 'express';
const router = express.Router();

import {getDetallesFacturas, getDetallesFacturaById, getDetallesFacturaByIdPago, createDetallesFactura, updateDetallesFactura  } from '../controllers/detallesFacturas.controller.js';

router.get('/detallesFacturas', getDetallesFacturas);
router.get('/detallesFacturas/:id', getDetallesFacturaById);
router.get('/detallesFacturas/:idPago', getDetallesFacturaByIdPago);
router.post('/detallesFacturas', createDetallesFactura);
router.put('/detallesFacturas', updateDetallesFactura);

export default router;