import jwt from "jsonwebtoken";
export function getUserFromCookie(req, res) {
    res.json({ valid: true, user: req.user });
}
