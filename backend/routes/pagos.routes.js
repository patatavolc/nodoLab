import express from 'express';
const router = express.Router();

import {getPagos, getPagoById, getPagosIdReserva, getReservasByMetodoPago, createPago, updatePago } from '../controllers/pagos.controller.js';

router.get('/pagos', getPagos);
router.get('/pagos/:id', getPagoById);
router.get('/pagos/:idReserva', getPagosIdReserva);
router.get('/pagos/:metodoPago', getReservasByMetodoPago);
router.post('/pagos', createPago);
router.put('/pagos', updatePago);

export default router;