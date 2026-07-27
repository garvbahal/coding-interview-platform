export const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center text-sm text-gray-500 flex flex-col items-center">
        <div className="flex items-center gap-2 font-semibold text-lg tracking-tight text-gray-900 mb-4">
          <div className="h-6 w-6 bg-black rounded-md flex items-center justify-center text-white text-[10px]">
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
          Coding Interviewer
        </div>
        <p>
          &copy; {new Date().getFullYear()} Coding Interviewer Platform.
          Elevating technical hires.
        </p>
      </div>
    </footer>
  );
};
