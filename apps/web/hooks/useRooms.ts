import { useQuery } from "@tanstack/react-query";
import { getJoinedRooms, getMyRooms } from "../services/room.service";

export const useMyRooms = () => {
  return useQuery({
    queryKey: ["myRooms"],
    queryFn: getMyRooms,
  });
};

export const useJoinedRooms = () => {
  return useQuery({
    queryKey: ["joinedRooms"],
    queryFn: getJoinedRooms,
  });
};
