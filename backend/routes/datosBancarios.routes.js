import express from "express";
const router = express.Router();

import {
    getDatosBancarios,
    createDatoBancario,
    updateDatosBancarios,
    getDatosBancariosByDni,
} from "../controllers/datosBancarios.controller.js";
import { authMiddleware, isAdmin } from "../middleware/auth.middeware.js";

router.get("/datosBancarios/:dni", getDatosBancariosByDni);
router.put("/datosBancarios/:id", authMiddleware, isAdmin, updateDatosBancarios);
router.get("/datosBancarios", getDatosBancarios);
router.post("/datosBancarios", createDatoBancario);

export default router;
