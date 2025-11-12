const registerChatHandlers = require('./chatHandlers.socket');
const users = {};

function initializeSocket(io) {
    
    //Escucha la primera conexión de un cliente
    io.on('connection', (socket) => {
        console.log("[Socket] Nuevo cliente conectado: " + socket.id);

        // Segun usuario
        socket.on('register', (userId) => {
            users[userId] = socket.id;
            console.log("Usuario  "+ userId + " registrado con socket ID: " + socket.id);
        });

        registerChatHandlers(io, socket, users);

        // Desconectar
        socket.on('disconnect', () => {
            console.log("[Socket] Cliente desconectado: " + socket.id);

        });
    });
}

module.exports = initializeSocket;
