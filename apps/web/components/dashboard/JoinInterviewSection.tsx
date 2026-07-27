"use client";

import { useState } from "react";
import { usePostJoinRoom } from "../../hooks/useRooms";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const JoinInterViewSection = () => {
  const [roomCode, setRoomCode] = useState("");
  const router = useRouter();

  const { mutate, isPending } = usePostJoinRoom();

  const handleJoinRoom = () => {
    if (roomCode.trim().length === 0) {
      toast.error("Room Code Missing");
      return;
    }
    mutate(roomCode.trim().toUpperCase(), {
      onSuccess: (data) => {
        router.replace(`/room/${roomCode}`);
      },
    });
  };

  return (
    <section className="text-center mb-16">
      <h1 className="text-4xl font-semibold text-gray-900 mb-4">
        Join Coding Interview
      </h1>
      <p className="text-lg text-gray-500 mb-8">
        Enter the room code shared by your interviewer.
      </p>

      <div className="max-w-md mx-auto">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="flex-1 px-5 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
          />
          <button
            className={`bg-black text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors whitespace-nowrap cursor-pointer`}
            disabled={isPending}
            onClick={handleJoinRoom}
          >
            {isPending ? "Joining..." : "Join Interview"}
          </button>
        </div>
      </div>
    </section>
  );
};
