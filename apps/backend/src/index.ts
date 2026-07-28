import express from "express";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.routes.js";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import { initializeSocket } from "./socket/index.js";
import { roomRouter } from "./routes/room.routes.js";
import { ExecuteRouter } from "./routes/execute.routes.js";
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/execute", ExecuteRouter);
app.use("/api/v1/rooms", roomRouter);
const httpServer = createServer(app);

initializeSocket(httpServer);
const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, () => {
  console.log("HTTP Server is started at 8000 port");
});
