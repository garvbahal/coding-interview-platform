import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.routes.js";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
const app = express();

console.log(process.env.CLIENT_URL);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", authRouter);
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

httpServer.listen(8000, () => {
  console.log("HTTP Server is started at 8000 port");
});
