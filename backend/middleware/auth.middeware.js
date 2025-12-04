import jwt from "jsonwebtoken";
import { generateFingerprint } from "../controllers/auth_controller.js";

export function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.json({ valid: false, reason: "No Token" });
        // frontend should redirect to login
    }

    try {
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);

        const actualFingerPrint = generateFingerprint(req);

        if (actualFingerPrint !== decoded_token.fingerPrint) {
            return res.json({ valid: false, reason: "Environment change" });
            // frontend should clear localStorage + redirect to login
        }

        req.user = decoded_token.user;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.json({ valid: false, reason: "expired" });
        } else {
            return res.json({ valid: false, reason: "invalid" });
        }
        // frontend should clear localStorage + redirect to login
    }
}
