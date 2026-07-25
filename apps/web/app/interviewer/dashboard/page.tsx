"use client";
import { DashboardNavbar } from "../../../components/dashboard/Navbar";
import { useMyRooms } from "../../../hooks/useRooms";
import { CreateInterviewSection } from "../../../components/dashboard/CreateInterviewSection";
import { ActiveInterviews } from "../../../components/dashboard/ActiveInterviews";
import { PreviousInterviewsSection } from "../../../components/dashboard/PreviousInterviewsSection";

export default function interviewerDashboard() {
  const { data, isPending, isError } = useMyRooms();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went Wrong</div>;
  }

  return (
    <div className="bg-white text-gray-900 antialiased">
      <div className="flex min-h-screen">
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <DashboardNavbar name="Garv Bahal" role="CANDIDATE" />

          <main className="flex-1 p-8 bg-gray-50">
            {/* Create Interview Section */}
            <CreateInterviewSection />
            <ActiveInterviews ActiveInterviewsData={data?.activeRooms} />
            <PreviousInterviewsSection
              previousInterviewsData={data.endedRooms}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
