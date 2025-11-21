import express from "express";
import http from "http";
import { Server } from "socket.io";
import initializeSocket from "./sockets/manager.socket.js";
import cookieParser from "cookie-parser";
import mainRouter from "./routes/mainRouter.js";
import cors from "cors";

const app = express();
const PORT = 3000;

const server = http.createServer(app);

app.use(
    cors({
        origin: "http://localhost:4173",
        credentials: true,
    })
);

const io = new Server(server, {
    //Configuracion del CORS si el fronted corre en puerto diferente
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

initializeSocket(io);

app.use(express.json());
app.use(cookieParser());

app.use('/api', mainRouter);

app.get("/", (req, res) => {
    res.send("🚀 Servidor Express funcionando. Prueba la ruta /api/prueba");
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
