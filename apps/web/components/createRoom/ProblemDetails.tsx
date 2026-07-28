"use client";

import { useState } from "react";
import { TestCaseCard } from "./TestCaseCard";
import { useCreateRoom } from "../../hooks/useRooms";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const ProblemDetails = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "EASY",
    testCases: [
      {
        input: "",
        expectedOutput: "",
        isHidden: false,
      },
    ],
  });

  const { mutate, isPending } = useCreateRoom();
  const router = useRouter();

  const handleSubmit = () => {
    if (!form.title.trim()) {
      toast.error("Title Required");
      return;
    }

    if (!form.description.trim()) {
      toast.error("Description Required");
      return;
    }

    if (form.testCases.length === 0) {
      toast.error("TestCases missing");
      return;
    }

    mutate(form, {
      onSuccess: (data) => {
        toast.success(data.message);
        router.replace(`/room/${data.data.roomCode}`);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      },
    });
  };

  const addTestCase = () => {
    setForm((prev) => ({
      ...prev,
      testCases: [
        ...prev.testCases,
        {
          input: "",
          expectedOutput: "",
          isHidden: false,
        },
      ],
    }));
  };

  const removeTestCase = (index: number) => {
    setForm((prev) => ({
      ...prev,
      testCases: prev.testCases.filter((testcase, i) => i != index),
    }));
  };

  const updateTestCase = (
    index: number,
    field: "input" | "expectedOutput" | "isHidden",
    value: string | boolean,
  ) => {
    setForm((prev) => ({
      ...prev,
      testCases: prev.testCases.map((tc, i) =>
        i === index ? { ...tc, [field]: value } : tc,
      ),
    }));
  };

  return (
    <main className="max-w-4xl mx-auto mt-8 px-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h2 className="text-xl font-bold mb-6">1. Problem Details</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Problem Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                required
                placeholder="e.g., Merge K Sorted Lists"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>

              <div className="flex gap-6">
                {[
                  { label: "Easy", value: "EASY" },
                  { label: "Medium", value: "MEDIUM" },
                  { label: "Hard", value: "HARD" },
                ].map((difficulty) => (
                  <label
                    key={difficulty.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="difficulty"
                      value={difficulty.value}
                      checked={form.difficulty === difficulty.value}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          difficulty: e.target.value as
                            | "EASY"
                            | "MEDIUM"
                            | "HARD",
                        }))
                      }
                      className="accent-black"
                    />

                    <span>{difficulty.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Problem Description (Supports Markdown)
              </label>
              <textarea
                rows={6}
                required
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Describe the problem, constraints, and provide an example..."
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black outline-none resize-y"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">2. Test Cases</h2>
            <button
              className="text-sm font-medium border border-gray-300 bg-white px-3 py-1.5 rounded-md hover:bg-gray-50"
              onClick={addTestCase}
            >
              + Add Test Case
            </button>
          </div>
        </div>

        {form.testCases.map((testCase, i) => (
          <TestCaseCard
            key={i}
            testCase={testCase}
            index={i}
            removeTestCase={removeTestCase}
            updateTestCase={updateTestCase}
            totalTestCases={form.testCases.length}
          />
        ))}

        <div className="p-6 border-t border-gray-200 bg-white flex justify-end gap-4">
          <Link
            href={"/interviewer/dashboard"}
            className="px-6 py-2 rounded-md text-gray-600 font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </Link>
          <button
            className={`px-6 py-2 rounded-md bg-black text-white font-medium hover:bg-gray-800 transition ${isPending ? "cursor-not-allowed" : "cursor-pointer"} `}
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? "Generating..." : "Generate Room Code"}
          </button>
        </div>
      </div>
    </main>
  );
};
