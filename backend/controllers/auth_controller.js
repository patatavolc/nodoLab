import {
    takenMail,
    takenUsername,
    takenDNI,
    registerValidatedUser,
    logByMail,
    logByName,
} from "../services/auth_service.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const aviableCredentials = async (dni, username, email, telefono, nombreCompleto) => {
    //Comprobacion de longitud de datos
    if (username.length > 100) throw new Error("El nombre de usuario excede los 100 caracteres.");
    if (telefono.length > 20) throw new Error("El teléfono excede los 20 caracteres.");
    if (nombreCompleto.length > 150) throw new Error("El nombre legal excede los 150 caracteres.");
    if (email.length > 100) throw new Error("El correo electrónico excede los 100 caracteres.");

    //Comprobacion de formatos
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dniRegex = /^(\d{8})([A-Z])$/;

    if (!mailRegex.test(email))
        throw new Error("El correo electrónico no cumple con el formato esperado.");
    if (!dniRegex.test(dni))
        throw new Error("El DNI introducido no cumple con el formato esperado.");

    //Comprobacion de datos en DB
    if (await takenDNI(dni)) throw new Error("El DNI introducido ya está registrado.");
    if (await takenUsername(username))
        throw new Error("El nombre de usuario introducido no está disponible.");
    if (await takenMail(email))
        throw new Error("El correo electrónico introducido ya está en uso.");

    return true;
};

export const registerUser = async (req, res) => {
    const { dni, username, email, telefono, nombreCompleto, password } = req.body;

    try {
        await aviableCredentials(dni, username, email, telefono, nombreCompleto);

        const salt = crypto.randomBytes(16).toString("hex");
        const passwordHash = crypto
            .createHash("sha256")
            .update(password + salt + process.env.PEPPER)
            .digest("hex");

        const user = await registerValidatedUser(
            dni,
            nombreCompleto,
            username,
            telefono,
            email,
            passwordHash,
            salt
        );

        if (user) {
            return res.status(201).json({
                message: "Usuario registrado correctamente.",
                user,
            });
        } else {
            return res.status(500).json({
                error: "Error de la base de datos al registrar el usuario.",
            });
        }
    } catch (err) {
        return res.status(409).json({ error: err.message });
    }
};

export function generateFingerprint(req) {
    const ip = req.socket.remoteAddress;
    const agent = req.headers["user-agent"] || "unknow";
    return crypto
        .createHash("sha256")
        .update(ip + agent)
        .digest("hex");
}

function passwordToHash(password, salt) {
    const passwordHash = crypto
        .createHash("sha256")
        .update(password + salt + process.env.PEPPER)
        .digest("hex");

    return passwordHash;
}

export const generateLoginToken = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let user;

    if (!email || !password) return null;

    if (email.includes("@")) {
        user = await logByMail(email);
    } else {
        user = await logByName(email);
    }

    if (!user || user == null) return null;

    if (passwordToHash(password, user.salt) !== user.password_hash) return false;

    const fingerPrint = generateFingerprint(req);
    const payload = { user, fingerPrint };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });

    return res.json({ token });
};

export const getUserFromAuthHeader = async (req, res) => {
    const user = req.user;
    return res.json({user});
};