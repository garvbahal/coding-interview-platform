import { Socket } from "socket.io";
import { SOCKET_EVENTS } from "../events.js";

export const customInputHandler = (socket: Socket) => {
  socket.on(
    SOCKET_EVENTS.CUSTOM_INPUT_CHANGED,
    ({ customInput }: { customInput: string }) => {
      const roomCode = socket.data.roomCode;
      if (!roomCode) {
        socket.emit(SOCKET_EVENTS.ERROR, {
          message: "You are not connected to the room",
        });
        return;
      }

      socket
        .to(roomCode)
        .emit(SOCKET_EVENTS.CUSTOM_INPUT_CHANGED, { customInput });
    },
  );
};
