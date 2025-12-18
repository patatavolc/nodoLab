import express from 'express';
const router = express.Router();

import { getDatosBancarios, createDatoBancario, updateDatosBancarios, getDatosBancariosByDni } from '../controllers/datosBancarios.controller.js'; 
import { authMiddleware, isAdmin } from '../middleware/auth.middeware.js';

router.get('/datosBancarios', authMiddleware, isAdmin, getDatosBancarios);
router.get('/datosBancarios/:dni', authMiddleware, isAdmin, getDatosBancariosByDni);
router.post('/datosBancarios', authMiddleware, isAdmin, createDatoBancario);
router.put('/datosBancarios/:id', authMiddleware, isAdmin, updateDatosBancarios);

export default router;