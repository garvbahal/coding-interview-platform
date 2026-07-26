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

export type TestCase = {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
};

export type createRoomDataRequired = {
  title: string;
  description: string;
  difficulty: string;
  testCases: TestCase[];
};

export type createRoomResponse = {
  success: boolean;
  message: string;
  data: {
    roomId: string;
    roomCode: string;
  };
};

export type getRoomDetailsResponse = {
  success: boolean;
  message: string;
  data: {
    roomId: string;
    roomCode: string;
    status: string;
    problem: {
      title: string;
      difficulty: string;
      description: string;
    };
    roomState: {
      language: string;
      code: string;
    };
  };
};
