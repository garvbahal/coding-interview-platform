"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEndInterview } from "../../hooks/useRooms";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

type RoomNavbarProps = {
  roomCode: string;
  unreadCount: number;
  onChatClick: () => void;
};

export const RoomNavbar = ({
  roomCode,
  unreadCount,
  onChatClick,
}: RoomNavbarProps) => {
  const userDetails = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  const { mutate, isPending } = useEndInterview();

  const handleEndInterview = () => {
    mutate(
      { roomCode },
      {
        onSuccess: (data) => {
          router.replace(`/${userDetails!.role.toLowerCase()}/dashboard`);
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
        <Link
          href={"/"}
          className="w-8 h-8 bg-black rounded-lg flex items-center justify-center"
        >
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
        </Link>
        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded border border-gray-200">
          Room: {roomCode}
        </span>
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Live
        </div>
      </div>
      <button
        onClick={onChatClick}
        className="relative rounded-lg p-2 transition hover:bg-neutral-300 cursor-pointer"
      >
        <MessageCircle className="h-5 w-5" />

        {unreadCount > 0 && (
          <span
            className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full  bg-red-500 x-1 text-[10px] font-semibold text-white
      "
          >
            {unreadCount}
          </span>
        )}
      </button>
      <div className="flex items-center gap-3">
        <button
          className="text-sm font-medium text-gray-600 border border-gray-300 px-4 py-1.5 rounded hover:bg-gray-50 cursor-pointer"
          onClick={handleLeaveRoom}
        >
          Leave
        </button>
        {userDetails?.role === "INTERVIEWER" ? (
          <button
            className={`text-sm font-medium text-white bg-black px-4 py-1.5 rounded hover:bg-gray-800 ${isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
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
