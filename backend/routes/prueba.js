import express from "express";
const router = express.Router();
import { registerUser, generateLoginToken } from "../controllers/auth_controller.js";

////PROBAR LOGIN
router.post("/auth/register", registerUser);

router.post("/auth/login", generateLoginToken);
/////

router.get("/", (req, res) => {
    res.status(200).json({
        mensaje: "¡Hola desde la RUTA DE PRUEBA!",
        archivo: "Respondiendo desde prueba.js",
    });
});

router.get("/usuario/:id", (req, res) => {
    const userId = req.params.id;
    res.status(200).send(`Buscando información para el usuario con ID: ${userId}`);
});

export default router;
