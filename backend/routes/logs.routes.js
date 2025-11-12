import express from 'express';
const router = express.Router();

import { getLogs, getLogById, getLogsByIdUsuario, getLogsByFecha, getLogsByMetodo, getLogsByIp, getLogsByUrl, createLog} from '../controller/logs.controller.js';

router.get('/logs', getLogs);
router.get('/logs/:id', getLogById);
router.get('/logs/:idUsuario', getLogsByIdUsuario);
router.get('/logs/:fecha', getLogsByFecha);
router.get('/logs/:metodo', getLogsByMetodo);
router.get('/logs/:ip', getLogsByIp);
router.get('/logs/:url', getLogsByUrl);
router.post('/logs', createLog);