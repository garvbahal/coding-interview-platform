import type { Socket } from "socket.io";
import { SOCKET_EVENTS } from "../events.js";

type LanguageChangedPayload = {
  language: string;
  starterCode: string;
};

export const registerLanguageHandlers = (socket: Socket) => {
  socket.on(
    SOCKET_EVENTS.LANGUAGE_CHANGED,
    ({ language, starterCode }: LanguageChangedPayload) => {
      if (!socket.data.roomCode) {
        socket.emit(SOCKET_EVENTS.ERROR, {
          message: "You are not connected to a room",
        });
        return;
      }

      socket.to(socket.data.roomCode).emit(SOCKET_EVENTS.LANGUAGE_CHANGED, {
        language,
        starterCode,
      });
    },
  );
};
