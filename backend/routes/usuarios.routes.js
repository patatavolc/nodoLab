import express from 'express';
const router = express.Router();

import { getUsuarios, createUsuario, updateUsuario, getUsuarioByDni} from '../controllers/usuarios.controller.js'; 

router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuarioByDni);
router.post('/usuarios', createUsuario);
router.put('/usuarios/:id', updateUsuario);

export default router; 