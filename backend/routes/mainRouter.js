import express from 'express';
const router = express.Router();

import usuariosRoutes from './usuarios.routes.js';
import datosBancariosRoutes from './datosBancarios.routes.js';
import recursosRoutes from './recursos.routes.js';

router.use(usuariosRoutes);
router.use(datosBancariosRoutes);
router.use(recursosRoutes);

export default router; 