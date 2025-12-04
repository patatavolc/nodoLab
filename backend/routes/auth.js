import express from "express";
const router = express.Router();

import { registerUser, generateLoginToken, getUserFromAuthHeader } from "../controllers/auth_controller.js";
import { authMiddleware } from "../middleware/auth.middeware.js";

router.post("/register", registerUser);

router.post("/login", generateLoginToken);

router.get("/userdata", authMiddleware, getUserFromAuthHeader);

export default router;
