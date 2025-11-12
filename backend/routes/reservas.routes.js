const express = require('express');
const router = express.Router();

const {getReservas, getReservaId, getReservaByDni, postReserva, updateReserva, getReservaByFecha } = require('../controllers/reservas.controller');

router.get('/reservas', getReservas);
router.get('/reservas/:id', getReservaId);
router.get('/reservas/:dni', getReservaByDni);
router.get('/reservas/:idRecurso', getReservaByRecurso);
router.get('/reservas/:fecha', getReservaByFecha);
router.post('/reservas', postReserva);
router.put('/reservas', updateReserva);

module.export = router;