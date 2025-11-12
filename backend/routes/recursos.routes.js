const express = require('express');
const router = express.Router();

const { getRecursos, getRecursosById, createRecursos, updateRecursos, getRecursosByTipo} = require('../controllers/recursos.controller');

router.get('/recursos', getRecursos);
router.get('/recursos/:id', getRecursosById);
router.get('/recursos/:tipo', getRecursosByTipo);
router.post('/recursos', createRecursos);
router.put('/recursos/:id', updateRecursos);

module.exports = router;