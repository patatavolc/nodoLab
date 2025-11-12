import express from 'express';
const router = express.Router();

import { getDatosBancarios, createDatosBancarios, updateDatosBancarios, getDatosBancariosByDni } from '../controllers/datosBancarios.controller.js'; 

router.get('/datosBancarios', getDatosBancarios);
router.get('/datosBancarios/:id', getDatosBancariosByDni);
router.post('/datosBancarios', createDatosBancarios);
router.put('/datosBancarios/:id', updateDatosBancarios);

export default router;