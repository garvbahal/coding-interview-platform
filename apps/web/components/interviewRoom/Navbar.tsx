"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEndInterview } from "../../hooks/useRooms";
import { useRouter } from "next/navigation";

type RoomNavbarProps = {
  roomCode: string;
};

export const RoomNavbar = ({ roomCode }: RoomNavbarProps) => {
  const userDetails = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  const { mutate, isPending } = useEndInterview();

  const handleEndInterview = () => {
    mutate(
      { roomCode },
      {
        onSuccess: (data) => {
          router.replace(`${userDetails?.role}/dashboard`);
        },
      },
    );
  };

  const handleLeaveRoom = () => {
    const role = userDetails?.role;
    if (!role) {
      return;
    }

    router.replace(`/${role.toLowerCase()}/dashboard`);
  };

  return (
    <header className="h-14 border-b border-gray-200 flex items-center justify-between px-4 shrink-0 bg-white">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            ></path>
          </svg>
        </div>
        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded border border-gray-200">
          Room: {roomCode}
        </span>
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Live
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="text-sm font-medium text-gray-600 border border-gray-300 px-4 py-1.5 rounded hover:bg-gray-50 cursor-pointer"
          onClick={handleLeaveRoom}
        >
          Leave
        </button>
        {userDetails?.role === "INTERVIEWER" ? (
          <button
            className="text-sm font-medium text-white bg-black px-4 py-1.5 rounded hover:bg-gray-800 cursor-pointer"
            onClick={handleEndInterview}
          >
            {isPending ? "Ending..." : "End Interview"}
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </header>
  );
};
