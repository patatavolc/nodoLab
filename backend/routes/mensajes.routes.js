import express from "express";
const router = express.Router();

import {} from "../controllers/mensajes.controller.js";

router.get("/mensajes/:id", getMensajesById);
router.get("/mensajes/:idEmisor", getMensajesByIdEmisor);
router.get("/mensajes/:idReceptor", getMensajesByIdReceptor);
router.get("/mensajes/:fecha", getMensajesByFecha);
router.get("/mensajes", getMensajes);
router.post("/mensajes", createDetallesFacturas);
//router.put('/mensajes', updateDetallesFacturas);

export default router;

//No entiendo este router, si quereis proteger alguna ruta simplemente usad authmiddleware y isadmin como en los demas - Carlos
