"use client";

import { useEffect, useState } from "react";
import { useGetRoomDetails } from "../../hooks/useRooms";
import { LeftPanel } from "./LeftPanel";
import { RoomNavbar } from "./Navbar";
import { RightPanel } from "./RightPanel";
import { DEFAULT_CODE, Language } from "./constant";
import { useRoomSocket } from "../../hooks/useRoomSocket";

export const RoomClient = ({ roomCode }: { roomCode: string }) => {
  const { data, isError, isPending } = useGetRoomDetails(roomCode);

  const [language, setLanguage] = useState<Language>("cpp");

  const [code, setCode] = useState("");

  useEffect(() => {
    if (!data) return;
    setLanguage(data.data.roomState.language as Language);
    setCode(data.data.roomState.code);
  }, [data]);

  const onReset = () => {
    setCode(DEFAULT_CODE[language]);
  };

  useRoomSocket({ roomCode, setCode, setLanguage, code });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="bg-white h-screen flex flex-col overflow-hidden">
      <RoomNavbar roomCode={roomCode} />
      <div className="flex-1 flex overflow-hidden">
        <LeftPanel
          title={data.data.problem.title}
          description={data.data.problem.description}
          difficulty={data.data.problem.difficulty}
        />
        <RightPanel
          language={language}
          roomCode={roomCode}
          code={code}
          setCode={setCode}
          setLanguage={setLanguage}
          onReset={onReset}
        />
      </div>
    </div>
  );
};
