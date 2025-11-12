const express = require('express');
const router = express.Router();

const { getDatosBancarios, createDatosBancarios, updateDatosBancarios} = require('../controllers/datosBancarios.controller');

router.get('/datosBancarios', getDatosBancarios);
router.get('/datosBancarios/:id', getDatosBancariosByDni);
router.post('/datosBancarios', createDatosBancarios);
router.put('/datosBancarios/:id', updateDatosBancarios);

module.exports = router;