"use client";

import { Play, Send, TerminalSquare } from "lucide-react";
import { useState } from "react";
import { useRunCode, useSubmitCode } from "../../hooks/useExecuteCode";
import type { Language } from "./constant";
import toast from "react-hot-toast";

interface BottomPanelProps {
  code: string;
  language: Language;
  roomCode: string;
}

export const BottomPanel = ({ code, language, roomCode }: BottomPanelProps) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const { mutate, isPending } = useRunCode();

  const { mutate: mutate2, isPending: isPending2 } = useSubmitCode();

  const handleSubmitButton = () => {
    mutate2(
      { code, language, roomCode },
      {
        onSuccess: (data) => {
          if (data.verdict === "Compilation Error") {
            setOutput(data.error ?? "Compilation Error");
            return;
          }

          setOutput(
            `${data.verdict}\n\nPassed: ${data.passed}/${data.total} test cases`,
          );
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message ?? "Something went wrong");
        },
      },
    );
  };

  const handleRunButton = () => {
    mutate(
      { code, language, input },
      {
        onSuccess: (data) => {
          if (data.data.status === "error") {
            setOutput(data.data.error);
          } else {
            setOutput(data.data.output);
          }
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message ?? "Something went wrong");
        },
      },
    );
  };

  return (
    <div className="h-60 bg-[#1e1e1e] border-t border-[#3c3c3c] flex flex-col">
      {/* Header */}
      <div className="h-11 px-4 border-b border-[#3c3c3c] flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-300">
          <TerminalSquare size={18} />
          <span className="text-sm font-medium">Console</span>
        </div>

        <div className="flex gap-2">
          <button
            className="flex items-center gap-2 rounded-md bg-green-600 hover:bg-green-700 px-4 py-1.5 text-sm font-medium text-white transition"
            disabled={isPending || isPending2}
            onClick={handleRunButton}
          >
            <Play size={15} />
            {isPending ? "Running..." : "Run"}
          </button>

          <button
            className="flex items-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-1.5 text-sm font-medium text-white transition"
            onClick={handleSubmitButton}
            disabled={isPending || isPending2}
          >
            <Send size={15} />
            {isPending2 ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Input */}
        <div className="w-1/2 border-r border-[#3c3c3c] flex flex-col">
          <div className="px-4 py-2 text-xs uppercase tracking-wider text-gray-400 border-b border-[#3c3c3c]">
            Custom Input
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter custom input..."
            className="
              flex-1
              bg-[#1e1e1e]
              text-gray-200
              font-mono
              text-sm
              p-4
              resize-none
              outline-none
              placeholder:text-gray-500
            "
          />
        </div>

        {/* Output */}
        <div className="w-1/2 flex flex-col">
          <div className="px-4 py-2 text-xs uppercase tracking-wider text-gray-400 border-b border-[#3c3c3c]">
            Output
          </div>

          <div className="flex-1 overflow-auto p-4 font-mono text-sm text-gray-200 whitespace-pre-wrap">
            {output || (
              <span className="text-gray-500">
                Click <span className="text-green-400">Run</span> to execute
                your code.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
