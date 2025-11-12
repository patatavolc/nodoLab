const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const initializeSocket = require('./sockets/manager.socket');

const app = express();
const PORT = 3000;

const server = http.createServer(app);

const io = new Server(server, {
    //Configuracion del CORS si el fronted corre en puerto diferente
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

initializeSocket(io);

const pruebaRoutes = require('./routes/prueba');

app.use(express.json());

app.use('/api/prueba', pruebaRoutes);

app.get('/', (req, res) => {
    res.send('🚀 Servidor Express funcionando. Prueba la ruta /api/prueba');
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});