import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type LeftPanelProps = {
  title: string;
  description: string;
  difficulty: string;
};

export const LeftPanel = ({
  title,
  description,
  difficulty,
}: LeftPanelProps) => {
  return (
    <div className="w-1/2 border-r border-gray-200 flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl font-bold">{title}</h1>
          <span
            className={`px-2 py-0.5 rounded text-xs font-bold ${difficulty === "EASY" ? "bg-green-100 text-green-700" : `${difficulty === "MEDIUM" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}`}
          >
            {difficulty}
          </span>
        </div>

        <div className="prose prose-sm text-gray-700 max-w-none mb-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
