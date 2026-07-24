import type { JwtPayload } from "../../types/JwtPayload.js";

type ConnectedUser = {
  socketId: string;
  user: JwtPayload;
};

class PresenceService {
  //one room multiple users
  //room -> (userId, {socketId, user})
  private rooms = new Map<string, Map<string, ConnectedUser>>();

  addUser(roomCode: string, socketId: string, user: JwtPayload) {
    if (!this.rooms.has(roomCode)) {
      this.rooms.set(roomCode, new Map());
    }

    this.rooms.get(roomCode)!.set(user.id, {
      socketId,
      user,
    });
  }

  removeUser(roomCode: string, userId: string) {
    const room = this.rooms.get(roomCode);

    if (!room) {
      return;
    }

    room.delete(userId);

    if (room.size === 0) {
      this.rooms.delete(roomCode);
    }
  }

  getUsers(roomCode: string) {
    const room = this.rooms.get(roomCode);

    if (!room) {
      return [];
    }

    return [...room.values()].map((entry) => entry.user);
  }
}

export const presenceService = new PresenceService();
