"use client";
import { useDispatch, useSelector } from "react-redux";
import { JoinInterViewSection } from "../../../components/dashboard/JoinInterviewSection";
import { DashboardNavbar } from "../../../components/dashboard/Navbar";
import { PreviousInterviewsSection } from "../../../components/dashboard/PreviousInterviewsSection";
import { useJoinedRooms } from "../../../hooks/useRooms";
import { RootState } from "../../../store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CodeSpinner } from "../../../components/spinners/CodeSpinner";

export default function candidateDashboard() {
  const userDetails = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  useEffect(() => {
    if (!userDetails) {
      router.replace("/auth/login");
      return;
    }

    if (userDetails.role === "INTERVIEWER") {
      router.replace("/interviewer/dashboard");
    }
  }, [userDetails, router]);

  const shouldFetch = userDetails?.role === "CANDIDATE";

  const { data, isError, isPending } = useJoinedRooms(shouldFetch);

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CodeSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        Something went wrong
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900 antialiased">
      <DashboardNavbar name={userDetails?.name!} role="CANDIDATE" />
      <main className="max-w-4xl mx-auto px-8 py-16">
        <JoinInterViewSection />
        <PreviousInterviewsSection previousInterviewsData={data.rooms} />
      </main>
    </div>
  );
}
