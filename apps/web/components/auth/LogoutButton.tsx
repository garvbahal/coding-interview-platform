import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { logoutUser } from "../../services/auth.service";
import { clearUser } from "../../store/slices/authSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { ErrorResponse } from "../../types/auth.types";

export const LogoutButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    try {
      const resData = await logoutUser();

      dispatch(clearUser());

      toast.success(resData.message);
    } catch (error) {
      if (axios.isAxiosError<ErrorResponse>(error)) {
        toast.error(error.response?.data?.message ?? "Something went wrong");
      } else {
        toast.error("Unexpected error");
      }
    }
  };

  return <button onClick={handleLogout}>Log out</button>;
};
