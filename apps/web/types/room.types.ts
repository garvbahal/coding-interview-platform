export type activeRoomType = {
  problem: {
    title: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
  };
  participants: { id: string }[];
  state: {
    language: string;
  };
  roomCode: string;
  status: "ACTIVE";
  createdAt: string;
};

export type endedRoomType = {
  problem: {
    title: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
  };
  roomCode: string;
  status: "ENDED";
  createdAt: string;
};

export type myRoomsResponse = {
  success: boolean;
  message: string;
  activeRooms: activeRoomType[];
  endedRooms: endedRoomType[];
};

export type joinedRoomsResponse = {
  success: boolean;
  message: string;
  rooms: endedRoomType[];
};
