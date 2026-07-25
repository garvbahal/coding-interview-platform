import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getJoinedRooms,
  getMyRooms,
  postCreateRoom,
} from "../services/room.service";

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
