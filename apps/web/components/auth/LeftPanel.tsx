import Link from "next/link";

type LeftPanelProps = {
  isSignup: boolean;
};

const SignUpText = {
  h2Heading: "The standard for technical hiring.",
  pParagraph:
    "Evaluate engineering skills in a real-world environment. Join thousands of teams running seamless, insightful technical interviews.",
};

const LoginText = {
  h2Heading: "Welcome back to the platform.",
  pParagraph: `Continue evaluating engineering skills in a real-world environment.
            Pick up right where you left off.`,
};

export const LeftPanel = ({ isSignup }: LeftPanelProps) => {
  return (
    <div className="hidden w-1/2 bg-gray-50 border-r border-gray-200 lg:flex lg:flex-col lg:justify-between p-12 relative overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 40V.5H40" fill="none"></path>
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#grid-pattern)"
        ></rect>
      </svg>
      <Link href="/">
        <div className="relative z-10 flex items-center gap-2 font-semibold text-xl tracking-tight text-gray-900">
          <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center text-white text-sm">
            CI
          </div>
          Coding Interviewer
        </div>
      </Link>
      <div className="relative z-10 max-w-md">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-4">
          {isSignup ? SignUpText.h2Heading : LoginText.h2Heading}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {isSignup ? SignUpText.pParagraph : LoginText.pParagraph}
        </p>
      </div>
    </div>
  );
};
