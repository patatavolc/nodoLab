import registerChatHandlers from './chatHandlers.socket.js';
import authMiddleware from '../middleware/socket.middleware.js'; 
const activeUsers = {};

export default function initializeSocket(io) {
    io.use(authMiddleware);

    // Escucha la primera conexión de un cliente
    io.on('connection', (socket) => {
        
        const userId = socket.userId; 

        activeUsers[userId] = socket.id;
        console.log("[Socket] Usuario " + userId +" conectado y autenticado con ID: " + socket.id);

        registerChatHandlers(io, socket, activeUsers);

        // Desconectar
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