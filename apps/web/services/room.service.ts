import axios from "axios";
import {
  createRoomDataRequired,
  createRoomResponse,
  joinedRoomsResponse,
  myRoomsResponse,
} from "../types/room.types";

export const getMyRooms = async (): Promise<myRoomsResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/rooms/my`,
    {
      withCredentials: true,
    },
  );

  return data;
};

export const getJoinedRooms = async (): Promise<joinedRoomsResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/rooms/joined`,
    {
      withCredentials: true,
    },
  );

  return data;
};

export const postCreateRoom = async ({
  title,
  description,
  testCases,
  difficulty,
}: createRoomDataRequired): Promise<createRoomResponse> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/rooms}`,
    {
      title,
      description,
      testCases,
      difficulty,
    },
    {
      withCredentials: true,
    },
  );
  return data;
};
