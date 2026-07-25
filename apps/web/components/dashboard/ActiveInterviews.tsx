import { activeRoomType } from "../../types/room.types";
import { ActiveInterviewCard } from "./ActiveInterviewCard";

interface ActiveInterviewsProps {
  ActiveInterviewsData: activeRoomType[];
}
export const ActiveInterviews = ({
  ActiveInterviewsData,
}: ActiveInterviewsProps) => {
  return (
    <section className="mb-10">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Active Interviews
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ActiveInterviewsData.map((activeRoom, i) => (
          <ActiveInterviewCard
            key={i}
            title={activeRoom.problem.title}
            difficulty={activeRoom.problem.difficulty}
            language={activeRoom.state.language}
            participants={activeRoom.participants.length}
            roomCode={activeRoom.roomCode}
            createdAt={activeRoom.createdAt}
          />
        ))}
      </div>
    </section>
  );
};
