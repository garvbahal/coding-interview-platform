import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { AuthenticateSocket } from "./middleware.js";

let io: Server;

export const initializeSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });
  io.use(AuthenticateSocket);
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized");
  }
  return io;
};
