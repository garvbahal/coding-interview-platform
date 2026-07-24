import { Socket } from "socket.io";
import { registerRoomHandlers } from "./room.handler.js";
import { presenceService } from "../services/presence.service.js";
import { getIO } from "../index.js";
import { SOCKET_EVENTS } from "../events.js";
import { registerCodeHandlers } from "./code.handler.js";
import { registerSaveHandlers } from "./save.handler.js";
import { registerLanguageHandlers } from "./language.handler.js";
import { registerSaveLanguageHandlers } from "./saveLanguage.handler.js";

export const handleConnection = (socket: Socket) => {
  console.log(`${socket.user.name} connected`);

  registerRoomHandlers(socket);
  registerCodeHandlers(socket);
  registerSaveHandlers(socket);
  registerLanguageHandlers(socket);
  registerSaveLanguageHandlers(socket);

  socket.on("disconnect", () => {
    const roomCode = socket.data.roomCode;

    if (!roomCode) return;

    presenceService.removeUser(roomCode, socket.user.id);

    const users = presenceService.getUsers(roomCode);

    getIO().to(roomCode).emit(SOCKET_EVENTS.PRESENCE_UPDATED, users);
  });
};
