"use client";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { getCurrentUser, googleSignup } from "../../services/auth.service";
import toast from "react-hot-toast";
import axios from "axios";
import { ErrorResponse } from "../../types/auth.types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { setUser } from "../../store/slices/authSlice";
import { useRouter } from "next/navigation";

export const GoogleLoginButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential;
    if (!token) {
      toast.error("Google Login Failed");
      return;
    }
    try {
      const responseData = await googleSignup({
        token,
      });
      const user = await getCurrentUser();
      dispatch(setUser(user.user));
      toast.success(responseData.message);
      router.replace("/");
    } catch (error) {
      if (axios.isAxiosError<ErrorResponse>(error)) {
        toast.error(error.response?.data?.message ?? "Something went wrong");
      } else {
        toast.error("Unexpected error");
      }
    }
  };

  return (
    <div>
      <button className="mt-6  w-full rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors">
        <GoogleLogin onSuccess={handleSuccess} />
      </button>
    </div>
  );
};
