const express = require('express');
const router = express.Router();

const usuariosRoutes = require('./usuario.routes');

router.use(usuariosRoutes);

module.exports = router;