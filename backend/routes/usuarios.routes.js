import express from 'express';
const router = express.Router();

import { getUsuarios, createUsuario, updateUsuario, getUsuariosByDni} from '../controllers/usuarios.controller.js'; 

router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuariosByDni);
router.post('/usuarios', createUsuario);
router.put('/usuarios/:id', updateUsuario);

export default router; 