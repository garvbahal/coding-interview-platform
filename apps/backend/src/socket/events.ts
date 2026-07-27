export const SOCKET_EVENTS = {
  JOIN_ROOM: "join-room",
  USER_JOINED: "user-joined",
  USER_LEFT: "user-left",
  ERROR: "error",
  ROOM_STATE: "room-state",
  PRESENCE_UPDATED: "presence-updated",
  CODE_CHANGED: "code-changed",
  LANGUAGE_CHANGED: "language-changed",
  SAVE_CODE: "save-code",
  END_INTERVIEW: "end-interview",
  ROOM_ENDED: "room-ended",

  SAVE_LANGUAGE: "save-language",
} as const;
