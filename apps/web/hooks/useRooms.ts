import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getJoinedRooms,
  getMyRooms,
  getRoomDetails,
  postCreateRoom,
  postJoinRoom,
} from "../services/room.service";
import toast from "react-hot-toast";

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
  return useQuery({
    queryKey: ["getRoomDetails", roomCode],
    queryFn: () => getRoomDetails(roomCode),
    enabled: !!roomCode,
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
