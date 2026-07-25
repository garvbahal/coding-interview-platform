export type ActiveInterviewCardProps = {
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  roomCode: string;
  language: string;
  participants: number;
  createdAt: string;
};

export const ActiveInterviewCard = ({
  title,
  difficulty,
  roomCode,
  participants,
  language,
  createdAt,
}: ActiveInterviewCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-gray-900 text-lg">{title}</h4>
          <span
            className={`inline-block mt-2 px-2.5 py-1  text-xs font-medium rounded-full ${difficulty === "EASY" ? "bg-green-100 text-green-700" : `${difficulty === "MEDIUM" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}`}
          >
            {difficulty}
          </span>
        </div>
        <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
          Active
        </span>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-3xl font-mono font-bold text-gray-900">
            {roomCode}
          </span>
          <button
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            title="Copy Room Code"
          >
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2  rounded-full ${participants > 0 ? "bg-yellow-500" : "bg-green-500"}`}
          ></div>
          <span className="text-sm text-gray-600">
            {participants > 0 ? "Candidate joined" : "Waiting for candidate..."}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Language</span>
          <span className="text-gray-900 font-medium">{language}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Created</span>
          <span className="text-gray-900">{createdAt}</span>
        </div>
      </div>

      <button className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors">
        Open Interview
      </button>
    </div>
  );
};
