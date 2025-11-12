const express = require('express');
const router = express.Router();

const usuariosRoutes = require('./usuario.routes');
const datosBancariosRoutes = require('./datosBancarios.routes');

router.use(usuariosRoutes);
router.use(datosBancariosRoutes);

module.exports = router;