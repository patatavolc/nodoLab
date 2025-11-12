module.exports = function registerChatHandlers(io, socket, users) {
    socket.on('private message', (data) => {
        const senderId = data.senderId;    // ID que envia
        const recipientId = data.recipientId; // ID destinatario
        const message = data.message;
        
        // Encontrar el Socket ID del destinatario
        const recipientSocketId = users[recipientId];
        
        if (recipientSocketId) {
            // Enviar por id
            io.to(recipientSocketId).emit('private message', {
                senderId: senderId,
                message: message
            });
            
            console.log("Mensaje enviado de " + senderId + " a " + recipientId + " " + recipientSocketId);
            
            // Envia confirmacion a emisor
            socket.emit('message sent confirmation', { recipientId: recipientId, success: true });
            
        } else {
            // El socket ID del destinatario no está mapeado
            console.log("Destinatario " + recipientId + " no encontrado/conectado.");
            socket.emit('message sent confirmation', { recipientId: recipientId, success: false});
        }
    });
    
}