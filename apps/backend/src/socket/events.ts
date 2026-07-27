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
  CUSTOM_INPUT_CHANGED: "custom-intput-changed",
  SAVE_CUSTOM_INPUT: "save-custom-input",

  SAVE_LANGUAGE: "save-language",
  SEND_MESSAGE: "send-message",
  NEW_MESSAGE: "new-message",
} as const;
