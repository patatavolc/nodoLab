import express from 'express';
const router = express.Router();

import { getDatosBancarios, createDatoBancario, updateDatosBancarios, getDatosBancariosByDni } from '../controllers/datosBancarios.controller.js'; 

router.get('/datosBancarios', getDatosBancarios);
router.get('/datosBancarios/:dni', getDatosBancariosByDni);
router.post('/datosBancarios', createDatoBancario);
router.put('/datosBancarios/:id', updateDatosBancarios);

export default router;