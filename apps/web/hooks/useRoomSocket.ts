import { useEffect } from "react";
import { socket } from "../services/socket.service";
import {
  CodeChangedType,
  LangaugeChangeType,
  UserJoinedType,
  UserLeftType,
} from "../types/socket.types";
import { Language } from "../components/interviewRoom/constant";

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

  SAVE_LANGUAGE: "save-language",
} as const;

interface useRoomSocketProps {
  roomCode: string;
  setCode: (value: string) => void;
  setLanguage: (value: Language) => void;
  code: string;
}

export const useRoomSocket = ({
  roomCode,
  setCode,
  setLanguage,
  code,
}: useRoomSocketProps) => {
  //Connection
  useEffect(() => {
    socket.connect();

    const onConnect = () => {
      console.log("Connected: ", socket.id);

      socket.emit(SOCKET_EVENTS.JOIN_ROOM, roomCode);
    };

    const onDisconnect = () => {
      console.log("Disconnected");
    };

    const onConnectionError = (err: Error) => {
      console.log("Connection Error: ", err.message);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectionError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectionError);

      socket.disconnect();
    };
  }, [roomCode]);

  //User Joined Broadcast
  useEffect(() => {
    const handleUserJoined = (data: UserJoinedType) => {
      console.log("User Joined: ", data);
    };

    socket.on(SOCKET_EVENTS.USER_JOINED, handleUserJoined);

    return () => {
      socket.off(SOCKET_EVENTS.USER_JOINED, handleUserJoined);
    };
  }, []);

  //User Left Broadcast
  useEffect(() => {
    const handleUserLeft = (data: UserLeftType) => {
      console.log("User Left: ", data);
    };

    socket.on(SOCKET_EVENTS.USER_LEFT, handleUserLeft);

    return () => {
      socket.off(SOCKET_EVENTS.USER_LEFT, handleUserLeft);
    };
  }, []);

  //Code Change
  useEffect(() => {
    const handleCodeChanged = (data: CodeChangedType) => {
      setCode(data.code);
    };

    socket.on(SOCKET_EVENTS.CODE_CHANGED, handleCodeChanged);

    return () => {
      socket.off(SOCKET_EVENTS.CODE_CHANGED, handleCodeChanged);
    };
  }, []);

  //language Change
  useEffect(() => {
    const handleLanguageChange = (data: LangaugeChangeType) => {
      console.log(data);
      setLanguage(data.language);
      setCode(data.starterCode);
    };

    socket.on(SOCKET_EVENTS.LANGUAGE_CHANGED, handleLanguageChange);

    return () => {
      socket.off(SOCKET_EVENTS.LANGUAGE_CHANGED, handleLanguageChange);
    };
  }, []);

  // Save Code Debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      socket.emit(SOCKET_EVENTS.SAVE_CODE, { code });
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [code]);
};
