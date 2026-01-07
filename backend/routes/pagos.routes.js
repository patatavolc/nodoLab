import express from 'express';
const router = express.Router();

import {getPagos, getPagoById, getPagoByIdReserva, getPagosByMetodoPago, createPago, updatePago } from '../controllers/pagos.controller.js';
import { authMiddleware, isAdmin } from '../middleware/auth.middeware.js';

router.get('/pagos/:id', getPagoById);
router.get('/pagos/:idReserva', getPagoByIdReserva);
router.get('/pagos/:metodoPago', getPagosByMetodoPago);
router.get('/pagos', getPagos);
router.post('/pagos', createPago);
router.put('/pagos',authMiddleware, isAdmin, updatePago);

export default router;