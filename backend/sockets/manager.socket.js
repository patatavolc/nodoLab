const registerChatHandlers = require('./chatHandlers.socket');
const authMiddleware = require('./auth.middleware');
const activeUsers = {};

function initializeSocket(io) {
    io.use(authMiddleware);

    //Escucha la primera conexión de un cliente
    io.on('connection', (socket) => {
        
        const userId = socket.userId; 

        activeUsers[userId] = socket.id;
        console.log("[Socket] Usuario " + userId +" conectado y autenticado con ID: " + socket.id);

        registerChatHandlers(io, socket, activeUsers);

        //  Desconectar
        socket.on('disconnect', () => {
            console.log("[Socket] Cliente desconectado: " + socket.id);
            
            // Quita de usuarios activos
            if (activeUsers[userId]) {
                delete activeUsers[userId];
                console.log("Usuario " + userId + " eliminado del mapeo.");
            }
        });
    });
}

module.exports = initializeSocket;
