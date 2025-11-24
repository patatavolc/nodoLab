import express from 'express';
const router = express.Router();

import {getPagos, getPagoById, getPagoByIdReserva, getPagosByMetodoPago, createPago, updatePago } from '../controllers/pagos.controller.js';

router.get('/pagos', getPagos);
router.get('/pagos/:id', getPagoById);
router.get('/pagos/:idReserva', getPagoByIdReserva);
router.get('/pagos/:metodoPago', getPagosByMetodoPago);
router.post('/pagos', createPago);
router.put('/pagos', updatePago);

export default router;