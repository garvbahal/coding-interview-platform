"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

import { logoutUser } from "../../services/auth.service";
import { clearUser } from "../../store/slices/authSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { ErrorResponse } from "../../types/auth.types";

export const HomepageNavbar = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const userDetails = useSelector((state: RootState) => state.auth.user);

  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

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

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href={"/"}
          className="flex items-center gap-2 font-semibold text-lg tracking-tight text-gray-900"
        >
          <div className="h-7 w-7 bg-black rounded-lg flex items-center justify-center text-white text-xs">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              ></path>
            </svg>
          </div>
          CodeNest
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium">
          {isLoading ? (
            <>
              <div className="h-9 w-16 animate-pulse rounded-full bg-gray-200" />
              <div className="h-9 w-28 animate-pulse rounded-full bg-gray-200" />
            </>
          ) : !isAuthenticated ? (
            <>
              <Link
                href={"/auth/login"}
                className="text-gray-600 hover:text-black transition-colors"
              >
                Log in
              </Link>
              <Link
                href={"/auth/signup"}
                className="rounded-full bg-black px-4 py-2 text-white shadow-sm hover:bg-gray-800 transition-colors"
              >
                Sign up free
              </Link>
            </>
          ) : (
            <>
              <button
                className="text-gray-600 hover:text-black transition-colors cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
              <Link
                href={`/${userDetails!.role.toLowerCase()}/dashboard`}
                className="rounded-full bg-black px-4 py-2 text-white shadow-sm hover:bg-gray-800 transition-colors"
              >
                Dashboard
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
