interface TestCaseCardProps {
  index: number;
  testCase: {
    input: string;
    expectedOutput: string;
    isHidden: boolean;
  };
  updateTestCase: (
    index: number,
    field: "input" | "expectedOutput" | "isHidden",
    value: string | boolean,
  ) => void;

  removeTestCase: (index: number) => void;
  totalTestCases: number;
}

export const TestCaseCard = ({
  index,
  testCase,
  removeTestCase,
  updateTestCase,
  totalTestCases,
}: TestCaseCardProps) => {
  return (
    <div className="space-y-4">
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm relative group">
        <button
          className={`absolute top-4 right-4 transition ${
            totalTestCases === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
          }`}
          onClick={() => removeTestCase(index)}
          disabled={totalTestCases === 1}
        >
          ✕
        </button>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">
              Input
            </label>
            <textarea
              rows={2}
              value={testCase.input}
              onChange={(e) => updateTestCase(index, "input", e.target.value)}
              className="w-full px-3 py-2 text-sm font-mono rounded border border-gray-300 focus:ring-1 focus:ring-black outline-none"
              placeholder="nums = [2,7,11,15], target = 9"
            ></textarea>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">
              Expected Output
            </label>
            <textarea
              rows={2}
              value={testCase.expectedOutput}
              onChange={(e) =>
                updateTestCase(index, "expectedOutput", e.target.value)
              }
              className="w-full px-3 py-2 text-sm font-mono rounded border border-gray-300 focus:ring-1 focus:ring-black outline-none"
              placeholder="[0, 1]"
            ></textarea>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="hidden-1"
            checked={testCase.isHidden}
            onChange={(e) =>
              updateTestCase(index, "isHidden", e.target.checked)
            }
            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
          />
          <label
            htmlFor={`hidden-${index}`}
            className="text-sm text-gray-600 font-medium"
          >
            Hide this test case from candidate during interview
          </label>
        </div>
      </div>
    </div>
  );
};
