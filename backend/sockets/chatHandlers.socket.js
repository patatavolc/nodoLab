export default function registerChatHandlers(io, socket, activeUsers) {
    socket.on('private message', (data) => {
        const senderId = data.senderId;        // ID que envia
        const recipientId = data.recipientId;  // ID destinatario
        const message = data.message;
        
        // Encontrar el Socket ID del destinatario
        const recipientSocketId = activeUsers[recipientId];
        
        if (recipientSocketId) {
            // Enviar por id (a un socket específico)
            io.to(recipientSocketId).emit('private message', {
                senderId: senderId,
                message: message
            });
            
            console.log("Mensaje enviado de " + senderId + " a " + recipientId + " " + recipientSocketId);
            
            // Envia confirmacion a emisor (solo al socket que envió)
            socket.emit('message sent confirmation', { recipientId: recipientId, success: true });
            
        } else {
            // El socket ID del destinatario no está mapeado
            console.log("Destinatario " + recipientId + " no encontrado/conectado.");
            socket.emit('message sent confirmation', { 
                recipientId: recipientId, 
                success: false, 
                error: 'User offline'
            });
        }
    });
}