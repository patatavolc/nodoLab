import express from "express";
import http from "http";
import { Server } from "socket.io";
import initializeSocket from "./sockets/manager.socket.js";
import cookieParser from "cookie-parser";
//import router from "./routes/mainRouter.js";
import routerPrueba from "./routes/prueba.js";
import cors from "cors";

const app = express();
const PORT = 3000;

const server = http.createServer(app);

//CORS HTTP/S
app.use(
    cors({
        origin: "http://localhost:4173",
        credentials: true,
    })
);

// CORS SOCKET IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

initializeSocket(io);

app.use(express.json());
app.use(cookieParser());

//app.use('/api', mainRouter);
app.use("/api", routerPrueba);

app.get("/", (req, res) => {
    res.send("🚀 Servidor Express funcionando. Prueba la ruta /api/prueba");
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
