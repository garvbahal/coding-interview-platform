"use client";

import { useEffect, useState } from "react";
import { useGetRoomDetails } from "../../hooks/useRooms";
import { LeftPanel } from "./LeftPanel";
import { RoomNavbar } from "./Navbar";
import { RightPanel } from "./RightPanel";
import { DEFAULT_CODE, Language } from "./constant";
import { useRoomSocket } from "../../hooks/useRoomSocket";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CodeSpinner } from "../spinners/CodeSpinner";
import { MessageType } from "../../types/room.types";
import { ChatPopup } from "./ChatPopup";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const RoomClient = ({ roomCode }: { roomCode: string }) => {
  const { data, isError, isPending, error } = useGetRoomDetails(roomCode);
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("cpp");
  const [code, setCode] = useState("");
  const [customInput, setCustomInput] = useState("");

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!data) return;
    setLanguage(data.data.roomState.language as Language);
    setCode(data.data.roomState.code);
    setCustomInput(data.data.roomState.customInput);
    setMessages(data.data.messages);
  }, [data]);

  const onReset = () => {
    setCode(DEFAULT_CODE[language]);
  };

  useEffect(() => {
    if (!isError) {
      return;
    }

    toast.error(error.response?.data?.message ?? "Something went wrong");
    router.replace("/");
  }, [isError, error, router]);

  useRoomSocket({
    roomCode,
    setCode,
    setLanguage,
    code,
    customInput,
    setCustomInput,
    setMessages,
    isChatOpen,
    setUnreadCount,
  });

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CodeSpinner />
      </div>
    );
  }

  if (isError) {
    return null;
  }

  return (
    <div className="bg-white h-screen flex flex-col overflow-hidden">
      <RoomNavbar
        unreadCount={unreadCount}
        onChatClick={() => {
          setIsChatOpen((prev) => !prev);
          setUnreadCount(0);
        }}
        roomCode={roomCode}
      />
      <div className="flex-1 flex overflow-hidden">
        <LeftPanel
          title={data.data.problem.title}
          description={data.data.problem.description}
          difficulty={data.data.problem.difficulty}
        />
        <RightPanel
          customInput={customInput}
          setCustomInput={setCustomInput}
          language={language}
          roomCode={roomCode}
          code={code}
          setCode={setCode}
          setLanguage={setLanguage}
          onReset={onReset}
        />
        <ChatPopup
          open={isChatOpen}
          messages={messages}
          roomCode={roomCode}
          currentUserId={user!.id}
          onClose={() => {
            setIsChatOpen(false);
          }}
        />
      </div>
    </div>
  );
};
