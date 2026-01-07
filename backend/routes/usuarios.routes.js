import express from "express";
const router = express.Router();

import {
    getUsuarios,
    createUsuario,
    updateUsuario,
    getUsuarioByDni,
} from "../controllers/usuarios.controller.js";
import { authMiddleware, isAdmin } from "../middleware/auth.middeware.js";

router.get("/usuarios/:id", getUsuarioByDni);
router.put("/usuarios/:id", authMiddleware, isAdmin, updateUsuario);
router.get("/usuarios", getUsuarios);
router.post("/usuarios", createUsuario);

export default router;
