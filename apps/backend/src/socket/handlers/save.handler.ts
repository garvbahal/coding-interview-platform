import type { Socket } from "socket.io";
import { SOCKET_EVENTS } from "../events.js";
import { prisma } from "@repo/db";

export const registerSaveHandlers = (socket: Socket) => {
  socket.on(SOCKET_EVENTS.SAVE_CODE, async ({ code }: { code: string }) => {
    try {
   
      if (!socket.data.roomId) {
        socket.emit(SOCKET_EVENTS.ERROR, {
          message: "You are not connected to the room",
        });
        return;
      }

      await prisma.roomState.update({
        where: {
          roomId: socket.data.roomId,
        },
        data: {
          code,
        },
      });
    } catch (error) {
      console.log(error);
      socket.emit(SOCKET_EVENTS.ERROR, {
        message: "Unable to save code",
      });
    }
  });
};
