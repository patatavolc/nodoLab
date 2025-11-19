import express from "express";
const router = express.Router();

import { registerUser, generateLoginToken } from "../controllers/auth_controller.js";

router.post("/register", registerUser);

router.post("/login", generateLoginToken);

export default router;
