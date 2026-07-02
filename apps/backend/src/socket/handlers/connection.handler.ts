import { Socket } from "socket.io";
import { registerRoomHandlers } from "./room.handler.js";

export const handleConnection = (socket: Socket) => {
  console.log(`${socket.user.name} connected`);

  registerRoomHandlers(socket);

  socket.on("disconnect", () => {
    console.log(`${socket.user.name} disconnected`);
  });
};
