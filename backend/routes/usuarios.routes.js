import express from "express";
const router = express.Router();

import {
    getUsuarios,
    createUsuario,
    updateUsuario,
    getUsuarioByDni,
} from "../controllers/usuarios.controller.js";
import { authMiddleware, isAdmin } from "../middleware/auth.middeware.js";

router.get("/usuarios", getUsuarios);
router.get("/usuarios/:id", getUsuarioByDni);
router.post("/usuarios", createUsuario);
router.put("/usuarios/:id", authMiddleware, isAdmin, updateUsuario);

export default router;
