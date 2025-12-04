import express from 'express';
const router = express.Router();

import usuariosRoutes from './usuarios.routes.js';
import datosBancariosRoutes from './datosBancarios.routes.js';
import recursosRoutes from './recursos.routes.js';
import reservasRoutes from './reservas.routes.js';
import pagosRoutes from './pagos.routes.js';
import facturasRoutes from './facturas.routes.js';
import detallesFacturasRoutes from './detallesFacturas.routes.js';
//import mensajesRoutes from './mensajes.routes.js';
//import logsRoutes from './logs.routes.js';

router.use(usuariosRoutes);
router.use(datosBancariosRoutes);
router.use(recursosRoutes);
router.use(reservasRoutes);
router.use(pagosRoutes);
router.use(facturasRoutes);
router.use(detallesFacturasRoutes);
//router.use(mensajesRoutes);
//router.use(logsRoutes);

export default router; 