import express from 'express'; 
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        mensaje: '¡Hola desde la RUTA DE PRUEBA!',
        archivo: 'Respondiendo desde prueba.js'
    });
});

router.get('/usuario/:id', (req, res) => {
    const userId = req.params.id;
    res.status(200).send(`Buscando información para el usuario con ID: ${userId}`);
});

export default router;