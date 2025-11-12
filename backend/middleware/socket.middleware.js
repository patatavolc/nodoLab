import jwt from 'jsonwebtoken'; 

// Acceder a las variables de entorno se hace a través de process.env
const JWT_SECRET = process.env.JWT_SECRET; 

if (!JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET no está definido en las variables de entorno.");
}

export default (socket, next) => {
    
    const token = socket.handshake.query.token;

    if (!token) {
        return next(new Error('Authentication error: Token missing'));
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET); 
        
        // Se añade el userId al socket
        socket.userId = decoded.userId; 
        next();

    } catch (err) {
        console.error('Socket Auth Error:', err.message);
        next(new Error('Authentication error: Invalid token'));
    }
};