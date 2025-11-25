import express from "express";
import { getDashboardData } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/dashboard", getDashboardData);
export default router;
