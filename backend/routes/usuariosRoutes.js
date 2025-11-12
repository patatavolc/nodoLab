const express = require('express');
const router = express.Router();

const { getUsuarios, createUsuario, updateUsuario} = require('../controllers/usuarios.controller');

router.get('/usuarios', getUsuarios);
router.post('/usuarios', createUsuario);
router.put('/usuarios/:id', updateUsuario);

module.exports = router;