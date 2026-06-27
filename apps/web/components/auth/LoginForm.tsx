"use client";

import { FormEvent, useState } from "react";
import { getCurrentUser, loginFunction } from "../../services/auth.service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ErrorResponse } from "../../types/auth.types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { setUser } from "../../store/slices/authSlice";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmitClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setisLoading(true);
      const responseData = await loginFunction({ email, password });

      toast.success(responseData.message);
      const currentUser = await getCurrentUser();
      dispatch(setUser(currentUser.user));
      router.replace("/");
    } catch (error) {
      if (axios.isAxiosError<ErrorResponse>(error)) {
        toast.error(error.response?.data?.message ?? "Something went wrong");
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      setisLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmitClick} className="mt-8 space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
            placeholder="jane@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-black hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-4 flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium  text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors ${isLoading ? ` bg-gray-500 cursor-not-allowed` : `bg-black cursor-pointer hover:bg-gray-800`} `}
        >
          {isLoading ? "Loading..." : "Log in"}
        </button>
      </form>
    </div>
  );
};
