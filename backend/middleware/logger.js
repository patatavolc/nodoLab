import newLog from '../services/logger.service.js';

const logger = (req, res, next) => {
    const today = new Date();
               
    const data = { /*id_usuario:req.body.id_usuario, */ fecha_log:today.toISOString(), metodo: req.method, ip: req.socket.remoteAddress, url: req.url };
    try {
        newLog(data);
    }catch(error){
        console.error('Error al guardar en la base de datos', error);
    }

    next();
};

export default logger;