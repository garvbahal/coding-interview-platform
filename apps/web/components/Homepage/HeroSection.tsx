import Link from "next/link";

export const HeroSection = () => {
  return (
    <main className="relative isolate overflow-hidden bg-white">
      {/* Subtle Grid Background  */}
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
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

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pb-32 lg:flex lg:px-8 lg:py-24">
        {/* Hero Text  */}
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8 w-full">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <div className="inline-flex space-x-6">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-200 shadow-sm">
                Platform
              </span>
              <a
                href="#feature-section"
                className="inline-flex items-center space-x-2 text-sm font-medium text-gray-600"
              >
                <span>Next-Gen Virtual Rooms</span>
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
          <h1 className="mt-10 text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl leading-tight">
            Conduct live coding interviews with precision.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            The ultimate collaborative platform for technical screens.
            Interviewers construct questions and test cases, candidates write
            syntax-highlighted code, and results are executed live—all in a
            seamlessly integrated virtual room with built-in chat.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/auth/signup"
              className="rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-gray-800 transition-all hover:scale-105"
            >
              Start Interviewing
            </Link>
            <a
              href="#feature-section"
              className="text-sm font-semibold leading-6 text-gray-900 group"
            >
              See how it works
              <span
                className="inline-block transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>
        </div>

        {/* High-End Desktop Mockup  */}
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32 w-full lg:w-auto">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none w-full">
            <div className="rounded-[2rem] bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:p-4 rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out shadow-2xl">
              <div className="relative w-full lg:w-[48rem] rounded-xl bg-[#0d1117] shadow-2xl overflow-hidden ring-1 ring-white/10 flex flex-col h-[34rem]">
                {/* Mock Editor Header */}
                <div className="flex items-center justify-between border-b border-gray-800 bg-[#161b22] px-4 py-3">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500 shadow-inner"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500 shadow-inner"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500 shadow-inner"></div>
                  </div>
                  <div className="flex items-center rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400 font-medium">
                    Room: python-dev-screen-1
                  </div>
                  <div className="flex gap-3 items-center text-xs font-medium text-gray-300">
                    <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-1">
                      <div className="h-2 w-2 rounded-full bg-blue-400 ring-2 ring-blue-400/30"></div>
                      Interviewer
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-1">
                      <div className="h-2 w-2 rounded-full bg-green-400 ring-2 ring-green-400/30 text-white"></div>
                      Candidate
                    </span>
                  </div>
                </div>

                {/* Main UI Area  */}
                <div className="flex flex-1 overflow-hidden">
                  {/* Sidebar: Question Description & Tests  */}
                  <div className="w-1/3 border-r border-gray-800 bg-[#0d1117] p-5 flex flex-col gap-4 text-sm text-gray-300">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white tracking-wide">
                        1. Two Sum
                      </h3>
                      <span className="rounded bg-green-500/20 px-2 py-0.5 text-[10px] font-bold text-green-400 uppercase">
                        Easy
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed border-l-2 border-gray-700 pl-3">
                      Given an array of integers
                      <code className="text-gray-200">nums</code> and an integer
                      <code className="text-gray-200">target</code>, return
                      indices of the two numbers such that they add up to
                      <code className="text-gray-200">target</code>.
                    </p>

                    <div className="mt-auto border-t border-gray-800 pt-4">
                      <span className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        Test Cases Runner
                      </span>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between rounded bg-[#161b22] border border-green-500/30 px-3 py-2 text-xs transition-colors">
                          <span className="text-green-400 font-medium">
                            Test Case 1
                          </span>
                          <span className="text-[10px] bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded">
                            Passed
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded bg-[#161b22] border border-gray-800 px-3 py-2 text-xs">
                          <span className="text-gray-400 font-medium">
                            Test Case 2
                          </span>
                          <span className="text-[10px] bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded">
                            Pending...
                          </span>
                        </div>
                        <button className="mt-2 w-full rounded lg bg-gradient-to-r from-blue-600 to-blue-500 py-1.5 text-xs font-semibold text-white shadow-sm hover:brightness-110">
                          Run All Tests
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Code Editor  */}
                  <div className="flex-1 p-5 font-mono text-sm leading-relaxed text-gray-300 relative bg-[#0d1117] selection:bg-blue-500/30">
                    <div className="flex mb-4 text-xs font-sans font-medium text-gray-500 border-b border-gray-800 pb-2 gap-4">
                      <span className="text-white border-b-2 border-blue-500 pb-2 -mb-[9px]">
                        solution.py
                      </span>
                    </div>

                    <div className="flex gap-4">
                      {/* Line Numbers  */}
                      <div className="flex flex-col text-right text-gray-600 text-xs select-none">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                      </div>
                      {/* Code  */}
                      <div className="flex-1">
                        <p>
                          <span className="text-[#ff7b72]">class</span>
                          <span className="text-[#d2a8ff]">Solution</span>:
                        </p>
                        <p className="ml-4">
                          <span className="text-[#ff7b72]">def</span>
                          <span className="text-[#d2a8ff]">twoSum</span>(
                          <span className="text-[#f85149]">self</span>, nums:
                          List[<span className="text-[#ff7b72]">int</span>],
                          target: <span className="text-[#ff7b72]">int</span>)
                          List[<span className="text-[#ff7b72]">int</span>]:
                        </p>
                        <p className="ml-8">
                          <span className="text-[#8b949e] italic">
                            # Track seen numbers and their indices
                          </span>
                        </p>
                        <p className="ml-8">seen = {}</p>
                        <p className="ml-8">
                          <span className="text-[#ff7b72]">for</span> i, num
                          <span className="text-[#ff7b72]">in</span>
                          <span className="text-[#79c0ff]">enumerate</span>
                          (nums):
                        </p>
                        <p className="ml-12">complement = target - num</p>
                        <p className="ml-12">
                          <span className="text-[#ff7b72]">if</span> complement
                          <span className="text-[#ff7b72]">in</span> seen:
                        </p>
                        <p className="ml-16 shadow-[0_0_0_2px_rgba(74,222,128,0.2)] bg-green-500/10 rounded-sm -mx-1 px-1 relative">
                          <span className="text-[#ff7b72]">return</span>
                          [seen[complement], i]
                          <span className="absolute right-[-2px] inset-y-0 w-0.5 bg-green-400 animate-pulse"></span>
                          <span className="absolute top-[-18px] right-0 bg-green-500 text-[#0d1117] text-[9px] px-1 rounded-sm font-sans font-bold shadow-sm">
                            Candidate
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Mock Chat Window Overlay  */}
                    <div className="absolute bottom-5 right-5 w-64 rounded-xl bg-[#161b22] shadow-2xl border border-gray-700 overflow-hidden flex flex-col font-sans transition-transform duration-300">
                      <div className="bg-gray-800 px-3 py-2 text-xs font-semibold text-white flex justify-between items-center border-b border-gray-700">
                        <span className="flex items-center gap-2">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            ></path>
                          </svg>
                          Room Chat
                        </span>
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      </div>
                      <div className="p-3 flex flex-col gap-3 text-xs h-32 overflow-y-auto bg-[#0d1117]/50">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] text-gray-500 font-medium">
                            Interviewer
                          </span>
                          <div className="bg-blue-500/10 border border-blue-500/20 text-blue-100 rounded-lg rounded-tl-none px-2 py-1.5">
                            Great space complexity here. Does it handle negative
                            numbers?
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                          <span className="text-[10px] text-gray-500 font-medium">
                            Candidate
                          </span>
                          <div className="bg-gray-800 border border-gray-700 text-gray-200 rounded-lg rounded-tr-none px-2 py-1.5">
                            Yes! Since the complement checks the exact
                            difference map.
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-[#161b22] border-t border-gray-700 flex gap-2">
                        <input
                          type="text"
                          placeholder="Type a message..."
                          className="w-full bg-[#0d1117] border border-gray-700 rounded-md px-2 py-1.5 text-xs text-white focus:outline-none focus:border-gray-500"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
