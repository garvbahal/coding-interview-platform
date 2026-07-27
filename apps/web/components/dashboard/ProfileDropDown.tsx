"use client";
import { ChevronDown, HomeIcon, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { logoutUser } from "../../services/auth.service";
import { clearUser } from "../../store/slices/authSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { ErrorResponse } from "../../types/auth.types";

interface ProfileDropdownProps {
  role: "CANDIDATE" | "INTERVIEWER";
  name: string;
}

export const ProfileDropdown = ({ role, name }: ProfileDropdownProps) => {
  const [open, setOpen] = useState(false);
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const resData = await logoutUser();
      router.replace("/");

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
    <div className="relative">
      {/* Trigger */}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-gray-100 cursor-pointer"
      >
        <div className="text-right hidden sm:block ">
          <p className="text-sm font-medium text-gray-900">{name}</p>

          <p className="text-xs text-gray-500">
            {role === "CANDIDATE" ? "Candidate" : "Interviewer"}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
          {initials}
        </div>

        <ChevronDown
          size={16}
          className={`transition duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}

      <div
        className={`absolute right-0 mt-3 w-60 origin-top-right overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl transition-all duration-200 ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <div className="border-b border-gray-100 p-4">
          <p className="font-semibold">{name}</p>

          <p className="text-sm text-gray-500">
            {role === "CANDIDATE" ? "Candidate" : "Interviewer"}
          </p>
        </div>

        <Link
          href={"/"}
          className="cursor-pointer flex w-full items-center gap-3 px-4 py-3 text-sm transition hover:bg-gray-50"
        >
          <HomeIcon size={18} />
          Home
        </Link>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 cursor-pointer transition hover:bg-red-50"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};
