import express from "express";
import {
    getDashboardData,
    getDashboardResumen,
    getDashboardReservas,
    getDashboardRecursos,
    getDashboardFinanzas,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/stats", getDashboardData);

router.get("/stats/resumen", getDashboardResumen);
router.get("/stats/reservas", getDashboardReservas);
router.get("/stats/recursos", getDashboardRecursos);
router.get("/stats/finanzas", getDashboardFinanzas);

export default router;
