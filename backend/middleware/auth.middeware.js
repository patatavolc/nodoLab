import { generateFingerprint } from "../controllers/auth_controller.js";

export function authMiddleware(req, res, next) {
    const token = req.cookies.nodolab_auth_token;

    if (!token) {
        return res.json({ valid: false, reason: "No Token" });
        //redirect a la pagina de login en el frontend
    }

    try {
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);

        const actualFingerPrint = generateFingerprint(req);

        if (actualFingerPrint !== decoded_token.fingerPrint) {
            res.clearCookie("myapp_auth_token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production" ? true : false,
                sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            });
            return res.json({ valid: false, reason: "Enviroment change" });
            //redirect a la pagina de login en el frontend
        }

        req.user = decoded_token.user;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.json({ valid: false, reason: "expired" });
        } else return res.json({ valid: false, reason: "invalid" });
        //redirect a la pagina de login en el frontend
    }
}
