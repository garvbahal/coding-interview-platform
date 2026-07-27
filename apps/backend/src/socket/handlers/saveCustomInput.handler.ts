import { Socket } from "socket.io";
import { SOCKET_EVENTS } from "../events.js";
import { prisma } from "@repo/db";

export const SaveCustomInputHandler = (socket: Socket) => {
  socket.on(
    SOCKET_EVENTS.SAVE_CUSTOM_INPUT,
    async ({ customInput }: { customInput: string }) => {
      const roomId = socket.data.roomId;

      if (!roomId) {
        socket.emit(SOCKET_EVENTS.ERROR, {
          message: "You are not connected to the room",
        });
        return;
      }

      await prisma.roomState.update({
        where: {
          roomId,
        },
        data: {
          customInput: customInput,
        },
      });

      socket.emit(SOCKET_EVENTS.SAVE_CUSTOM_INPUT, {
        message: "Custom Input saved successfully",
      });
    },
  );
};
