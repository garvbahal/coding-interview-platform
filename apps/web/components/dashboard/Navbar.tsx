type DashboardNavbarPayload = {
  role: "CANDIDATE" | "INTERVIEWER";
  name: string;
};

export const DashboardNavbar = ({ role, name }: DashboardNavbarPayload) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <nav className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-8">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            ></path>
          </svg>
        </div>
        <span className="font-semibold text-lg">CodeInterview</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">
            {role === "CANDIDATE" ? "Candidate" : "Interviewer"}
          </p>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">
            {initials || "CI"}
          </span>
        </div>
      </div>
    </nav>
  );
};
