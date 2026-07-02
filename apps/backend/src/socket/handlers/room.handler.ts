import { Socket } from "socket.io";
import { SOCKET_EVENTS } from "../events.js";
import { prisma } from "@repo/db";

export const registerRoomHandlers = (socket: Socket) => {
  socket.on(SOCKET_EVENTS.JOIN_ROOM, async (roomCode: string) => {
    try {
      //checking room exists or not
      const room = await prisma.room.findUnique({
        where: {
          roomCode,
        },
      });

      if (!room) {
        socket.emit(SOCKET_EVENTS.ERROR, {
          message: "Room not found",
        });
        return;
      }

      //checking room status is active or not
      if (room.status !== "ACTIVE") {
        socket.emit(SOCKET_EVENTS.ERROR, {
          message: "Room is not active",
        });
        return;
      }

      const user = socket.user;

      const participant = await prisma.roomParticipant.findUnique({
        where: {
          roomId_userId: {
            roomId: room.id,
            userId: user.id,
          },
        },
      });

      //checking if user is participant of this room or not
      if (!participant) {
        socket.emit(SOCKET_EVENTS.ERROR, {
          message: "You are not allowed to enter the room",
        });

        return;
      }

      socket.join(room.roomCode);

      const roomState = await prisma.roomState.findUnique({
        where: {
          roomId: room.id,
        },
      });

      if (!roomState) {
        socket.emit(SOCKET_EVENTS.ERROR, {
          message: "Room state not found",
        });
        return;
      }

      socket.emit(SOCKET_EVENTS.ROOM_STATE, {
        language: roomState.language,
        code: roomState.code,
      });

      socket.to(room.roomCode).emit(SOCKET_EVENTS.USER_JOINED, {
        user,
      });

      return;
    } catch (error) {
      socket.emit(SOCKET_EVENTS.ERROR, {
        message: "Something went wrong while joining the room",
      });
    }
  });
};
