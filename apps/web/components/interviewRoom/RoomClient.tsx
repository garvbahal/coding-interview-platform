"use client";

import { useState } from "react";
import { useGetRoomDetails } from "../../hooks/useRooms";
import { LeftPanel } from "./LeftPanel";
import { RoomNavbar } from "./Navbar";
import { RightPanel } from "./RightPanel";
import { DEFAULT_CODE, Language } from "./constant";

export const RoomClient = ({ roomCode }: { roomCode: string }) => {
  //temporary things
  const title = "temp";
  const description = "temp";
  const difficulty = "EASY";
  const [language, setLanguage] = useState<Language>("cpp");

  const [code, setCode] = useState(DEFAULT_CODE.cpp);

  const onReset = () => {
    setCode(DEFAULT_CODE[language]);
  };

  //   const { data, isError, isPending } = useGetRoomDetails(roomCode);

  //   if (isPending) {
  //     return <div>Loading...</div>;
  //   }

  //   if (isError) {
  //     return <div>Something went wrong</div>;
  //   }

  return (
    <div className="bg-white h-screen flex flex-col overflow-hidden">
      <RoomNavbar roomCode={roomCode} />
      <div className="flex-1 flex overflow-hidden">
        <LeftPanel
          //   title={data.data.problem.title}
          //   description={data.data.problem.description}
          //   difficulty={data.data.problem.difficulty}
          title={title}
          description={description}
          difficulty={difficulty}
        />
        <RightPanel
          language={language}
          code={code}
          setCode={setCode}
          setLanguage={setLanguage}
          onReset={onReset}
        />
      </div>
    </div>
  );
};
