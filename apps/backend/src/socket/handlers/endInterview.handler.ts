import { Socket } from "socket.io";
import { SOCKET_EVENTS } from "../events.js";

export const endInterviewHandler = (socket: Socket) => {
  socket.on(SOCKET_EVENTS.END_INTERVIEW, () => {
    if (!socket.data.roomCode) {
      socket.emit(SOCKET_EVENTS.ERROR, {
        message: "You are not connected to the room",
      });
      return;
    }

    socket.to(socket.data.roomCode).emit(SOCKET_EVENTS.ROOM_ENDED);
  });
};
