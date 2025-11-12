const express = require('express');
const app = express();
const PORT = 3000;

const pruebaRoutes = require('./routes/prueba');

app.use(express.json());

app.use('/api/', mainRouter);

app.get('/', (req, res) => {
    res.send('🚀 Servidor Express funcionando. Prueba la ruta /api/prueba');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});