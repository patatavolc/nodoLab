const express = require('express');
const router = express.Router();

const { getUsuarios, createUsuario, updateUsuario, getUsuariosByDni} = require('../controllers/usuarios.controller');

router.get('/usuarios', getUsuarios);
router.get('/usuarios/:', getUsuariosByDni);
router.post('/usuarios', createUsuario);
router.put('/usuarios/:id', updateUsuario);

module.exports = router;