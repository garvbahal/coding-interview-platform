import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getJoinedRooms,
  getMyRooms,
  getRoomDetails,
  postCreateRoom,
  postEndInterview,
  postJoinRoom,
} from "../services/room.service";
import toast from "react-hot-toast";
import { socket } from "../services/socket.service";
import { SOCKET_EVENTS } from "./useRoomSocket";
import { getRoomDetailsResponse } from "../types/room.types";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

export const useMyRooms = (enabled: boolean) => {
  return useQuery({
    queryKey: ["myRooms"],
    queryFn: getMyRooms,
    enabled,
  });
};

export const useJoinedRooms = (enabled: boolean) => {
  return useQuery({
    queryKey: ["joinedRooms"],
    queryFn: getJoinedRooms,
    enabled,
  });
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCreateRoom,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myRooms"],
      });
    },
  });
};

export const useGetRoomDetails = (roomCode: string) => {
  return useQuery<getRoomDetailsResponse, AxiosError<ApiError>>({
    queryKey: ["getRoomDetails", roomCode],
    queryFn: () => getRoomDetails(roomCode),
    enabled: !!roomCode,
    retry: false,
  });
};

export const usePostJoinRoom = () => {
  return useMutation({
    mutationFn: postJoinRoom,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
};

export const useEndInterview = () => {
  return useMutation({
    mutationFn: postEndInterview,
    onSuccess: (data) => {
      socket.emit(SOCKET_EVENTS.END_INTERVIEW);
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
};
