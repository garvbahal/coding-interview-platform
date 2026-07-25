"use client";

import Link from "next/link";

export const CreateRoomNavbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center gap-4 sticky top-0 z-50">
      <Link
        href="/interviewer/dashboard"
        className="text-gray-500 hover:text-black"
      >
        ← Back to Dashboard
      </Link>

      <div className="h-6 w-px bg-gray-300"></div>
      <h1 className="font-semibold text-lg">Create New Interview Room</h1>
    </nav>
  );
};
