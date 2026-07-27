import type { Socket } from "socket.io";
import { SOCKET_EVENTS } from "../events.js";
import { prisma } from "@repo/db";

export const sendMessageHandler = (socket: Socket) => {
  socket.on(
    SOCKET_EVENTS.SEND_MESSAGE,
    async ({ message }: { message: string }) => {
      try {
        console.log("Message is in socket");
        const roomId = socket.data.roomId;

        if (!roomId) {
          socket.emit(SOCKET_EVENTS.ERROR, {
            message: "You are not connected to the room",
          });
          return;
        }

        if (!message.trim()) {
          return;
        }

        console.log("creating message entry in db");

        const newMessage = await prisma.message.create({
          data: {
            message,
            roomId,
            senderId: socket.user.id,
          },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        console.log("Sending message to all persons");

        socket.emit(SOCKET_EVENTS.NEW_MESSAGE, newMessage);

        socket
          .to(socket.data.roomCode)
          .emit(SOCKET_EVENTS.NEW_MESSAGE, newMessage);
      } catch (error) {
        socket.emit(SOCKET_EVENTS.ERROR, {
          message: "Something went wrong while sending message",
        });
      }
    },
  );
};
