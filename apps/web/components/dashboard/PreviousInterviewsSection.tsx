import { endedRoomType } from "../../types/room.types";
import { PreviousInterviewTableRow } from "./PreviousInterviewTableRow";

interface previousInterviewProps {
  previousInterviewsData: endedRoomType[];
}

export const PreviousInterviewsSection = ({
  previousInterviewsData,
}: previousInterviewProps) => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Previous Interviews
      </h3>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                Problem
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                Difficulty
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                Created At
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">
                Room Code
              </th>
            </tr>
          </thead>
          <tbody>
            {previousInterviewsData.map((previousInterview, i) => (
              <PreviousInterviewTableRow
                key={i}
                difficulty={previousInterview.problem.difficulty}
                title={previousInterview.problem.title}
                createdAt={previousInterview.createdAt}
                roomCode={previousInterview.roomCode}
                status={previousInterview.status}
              />
            ))}
          </tbody>
        </table>
      </div>
      {previousInterviewsData.length === 0 && (
        <div className="flex justify-center mt-5">No Previous Interviews</div>
      )}
    </section>
  );
};
