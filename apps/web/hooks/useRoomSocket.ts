import { useEffect } from "react";
import { socket } from "../services/socket.service";
import {
  CodeChangedType,
  CustomInputChangeType,
  LangaugeChangeType,
  UserJoinedType,
  UserLeftType,
} from "../types/socket.types";
import { Language } from "../components/interviewRoom/constant";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
} as const;

interface useRoomSocketProps {
  roomCode: string;
  setCode: (value: string) => void;
  setLanguage: (value: Language) => void;
  code: string;
  customInput: string;
  setCustomInput: (value: string) => void;
}

export const useRoomSocket = ({
  roomCode,
  setCode,
  setLanguage,
  code,
  customInput,
  setCustomInput,
}: useRoomSocketProps) => {
  const router = useRouter();

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

  //room-ended
  useEffect(() => {
    const handleRoomEnded = () => {
      toast.success("Interview has ended");
      router.replace("/");
      return;
    };

    socket.on(SOCKET_EVENTS.ROOM_ENDED, handleRoomEnded);

    return () => {
      socket.off(SOCKET_EVENTS.ROOM_ENDED, handleRoomEnded);
    };
  }, []);

  //custom-input-change
  useEffect(() => {
    const handleCustomInputChanged = (data: CustomInputChangeType) => {
      console.log("Received on client:", data);
      setCustomInput(data.customInput);
    };

    socket.on(SOCKET_EVENTS.CUSTOM_INPUT_CHANGED, handleCustomInputChanged);

    return () => {
      socket.off(SOCKET_EVENTS.CUSTOM_INPUT_CHANGED, handleCustomInputChanged);
    };
  }, []);

  //save-custom-input-change
  useEffect(() => {
    const timer = setTimeout(() => {
      socket.emit(SOCKET_EVENTS.SAVE_CUSTOM_INPUT, {
        customInput,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [customInput]);
};
