const express = require('express');
const router = express.Router();

const usuariosRoutes = require('./usuarios.routes');
const datosBancariosRoutes = require('./datosBancarios.routes');
const recursosRoutes = require('./recursos.routes');

router.use(usuariosRoutes);
router.use(datosBancariosRoutes);
router.use(recursosRoutes);

module.exports = router;