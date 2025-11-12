const jwt = require('jsonwebtoken'); 
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    //modificar
    console.error("FATAL ERROR: JWT_SECRET no está definido en las variables de entorno.");
    
}


module.exports = (socket, next) => {
    
    // Obtener token
    const token = socket.handshake.query.token;

    if (!token) {
        return next(new Error('Authentication error: Token missing'));
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET); 
        
        //Adjunta el userId 
        socket.userId = decoded.userId; 
        next();

    } catch (err) {
        console.error('Socket Auth Error:', err.message);
        next(new Error('Authentication error: Invalid token'));
    }
};