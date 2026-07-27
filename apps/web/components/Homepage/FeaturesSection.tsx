import { FeatureBox } from "./FeatureBox";
const data = [
  {
    svgData: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    title: "Real-time Code Sync",
    description:
      "Watch candidates formulate their logic stroke-by-stroke. Both participants see cursor positions, highlighted selections, and live edits with virtually zero latency.",
  },

  {
    svgData: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
    title: "Pre-configured Test Cases",
    description: `Interviewers can construct custom challenges with hidden and
                        visible test cases before the interview begins. Evaluate the
                        logic instantly the moment the candidate hits submit.`,
  },

  {
    svgData: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
    title: "Integrated Virtual Room Chat",
    description: `Stay in the same context. Clarify edge cases, drop helpful
                        hints, or communicate continuously through the built-in chat
                        window—keeping the entire focus inside the IDE.`,
  },

  {
    svgData: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Secure & Instant Execution",
    description: `When the candidate builds their solution, it compiles and runs
                        safely in a backend sandbox container. Both parties view
                        compiler output, execution time, and stdout live.`,
  },
];

export const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-24 sm:py-32 bg-gray-50 border-t border-gray-200"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold leading-7 tracking-widest uppercase text-gray-500">
            Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything required for a flawless assessment.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            The platform eliminates screen sharing lag and context-switching,
            putting both the interviewer and candidate inside a perfectly
            synchronized IDE.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-16 lg:max-w-none lg:grid-cols-2 lg:gap-y-24">
            {data.map((dataVal, i) => (
              <FeatureBox key={i} dataVal={dataVal} />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
