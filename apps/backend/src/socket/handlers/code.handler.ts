import type { Socket } from "socket.io";
import { SOCKET_EVENTS } from "../events.js";

export const registerCodeHandlers = (socket: Socket) => {
  socket.on(SOCKET_EVENTS.CODE_CHANGED, ({ code }: { code: string }) => {
    if (!socket.data.roomCode) {
      socket.emit(SOCKET_EVENTS.ERROR, {
        message: "You are not connected to the room",
      });
      return;
    }

    // broadcast to everyone except sender
    socket.to(socket.data.roomCode).emit(SOCKET_EVENTS.CODE_CHANGED, {
      code,
    });
  });
};
