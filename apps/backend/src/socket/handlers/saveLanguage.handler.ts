import type { Socket } from "socket.io";
import { SOCKET_EVENTS } from "../events.js";
import { prisma } from "@repo/db";

type SaveLanguagePayload = {
  language: string;
  code: string;
};

export const registerSaveLanguageHandlers = (socket: Socket) => {
  socket.on(
    SOCKET_EVENTS.SAVE_LANGUAGE,
    async ({ language, code }: SaveLanguagePayload) => {
      try {
        if (!socket.data.roomId) {
          socket.emit(SOCKET_EVENTS.ERROR, {
            message: "You are not connected to a room",
          });
          return;
        }

        await prisma.roomState.update({
          where: {
            roomId: socket.data.roomId,
          },
          data: {
            language,
            code,
          },
        });
      } catch (error) {
        console.log(error);

        socket.emit(SOCKET_EVENTS.ERROR, {
          message: "Unable to save language",
        });
      }
    },
  );
};
