"use client";
import { JoinInterViewSection } from "../../../components/dashboard/JoinInterviewSection";
import { DashboardNavbar } from "../../../components/dashboard/Navbar";
import { PreviousInterviewsSection } from "../../../components/dashboard/PreviousInterviewsSection";
import { useJoinedRooms } from "../../../hooks/useRooms";

export default function candidateDashboard() {
  const { data, isError, isPending } = useJoinedRooms();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="bg-white text-gray-900 antialiased">
      <DashboardNavbar name="Garv Bahal" role="CANDIDATE" />
      <main className="max-w-4xl mx-auto px-8 py-16">
        <JoinInterViewSection />
        <PreviousInterviewsSection previousInterviewsData={data.rooms} />
      </main>
    </div>
  );
}
