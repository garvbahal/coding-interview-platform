export const CreateInterviewSection = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Interviews</h2>
        <p className="text-gray-500 mt-1">Manage your coding interviews</p>
      </div>
      <button className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
        Create Interview
      </button>
    </div>
  );
};
