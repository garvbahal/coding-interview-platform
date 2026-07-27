import axios from "axios";
import {
  createRoomDataRequired,
  createRoomResponse,
  getRoomDetailsResponse,
  joinedRoomsResponse,
  myRoomsResponse,
  postEndInterviewResponse,
  postJoinRoomResponse,
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/rooms`,
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

export const getRoomDetails = async (
  roomCode: string,
): Promise<getRoomDetailsResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/rooms/getRoomDetails/${roomCode}`,
    { withCredentials: true },
  );
  return data;
};

export const postJoinRoom = async (
  roomCode: string,
): Promise<postJoinRoomResponse> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/rooms/join`,
    {
      roomCode,
    },
    {
      withCredentials: true,
    },
  );
  return data;
};

export const postEndInterview = async ({
  roomCode,
}: {
  roomCode: string;
}): Promise<postEndInterviewResponse> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/rooms/${roomCode}/end`,
    {},
    { withCredentials: true },
  );

  return data;
};
