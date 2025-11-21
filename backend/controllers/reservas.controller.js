import {newReserva} from "../services/reservas.service.js";

// Crear una reserva
export const createReserva = (req, res) => {
    const data = req.body;

    if(data.nombre) {
        newReserva(data)
        .then((newReservaService) => {
            res.status(200).send(newReservaService);
        })
        .catch((error) => {
            res.status(400).send({error: error.message});
        });
    }else {
        res.status(400).send({error: 'Faltan datos obligatorios'});
    }
}

//Obtener reservas
export const getReservas = (req, res) => {
    getAllReservas()
    .then((reservas) => {
        res.send(reservas);
    });
}

//Obtener reserva por id
export const getReservaId = (req, res) => {
    const id = req.body.id;

    if(id){
        getReservaIdService(id)
        .then((reservas) => {
            res.status(200).send(reservas)
        })
        .catch((error) => {
            res.status(400).send({error: error.message})
        })
    } else {
        res.status(400).send({error:'Id incorrecto'});
    }
}

// Obtener reserva por dni
export const getReservaDni = (req,res) =>{
    const dni = req.body.dni;

    if(dni) {
        getReservaDni(dni)
        .then((reservas) =>{
            res.status(200).send(reservas)
        })
        .catch((error) => {
            res.status(400).send({error: error.message})
        })
    } else {
        res.status(400).send({error: 'Dni erroneo'})
    }
}

//Obtener reserva por id
export const getReservaIdRecurso = (req, res) => {
    const idRecurso = req.body.idRecurso;

    if(idRecurso){
        getReservaIdRecursoService(idRecurso)
        .then((reservas) => {
            res.status(200).send(reservas)
        })
        .catch((error) => {
            res.status(400).send({error: error.message})
        })
    } else {
        res.status(400).send({error:'Id incorrecto'});
    }
}

//Obtener reservas por fecha
export const getRecursoFecha = (req, res) => {
    const fechaReserva = req.body.fecha_inicio;

    if(fechaReserva){
        getReservaFechaService(fechaReserva)
        .then((reservas) => {
            res.status(200).send(reservas)
        })
        .catch((error) => {
            res.status(400).send({error: error.message})
        })
    }else {
        res.status(400).send({error: 'Fecha erronea'})
    }
}