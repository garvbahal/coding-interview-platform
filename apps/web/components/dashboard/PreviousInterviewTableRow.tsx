type previousInterviewRowProps = {
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  status: string;
  createdAt: string;
  roomCode: string;
};
export const PreviousInterviewTableRow = ({
  title,
  difficulty,
  createdAt,
  roomCode,
  status,
}: previousInterviewRowProps) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{title}</td>

      <td className="px-6 py-4">
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full ${difficulty === "EASY" ? "bg-green-100 text-green-700" : `${difficulty === "MEDIUM" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}`}
        >
          {difficulty}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">{createdAt}</td>
      <td className="px-6 py-4 text-right"> {roomCode}</td>
    </tr>
  );
};
