import express from "express";
const app = express();
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

httpServer.listen(3000, () => {
  console.log("HTTP Server is started at 3000 port");
});
