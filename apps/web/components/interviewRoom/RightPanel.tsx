"use client";
import Editor from "@monaco-editor/react";
import { DEFAULT_CODE, Language, LANGUAGES } from "./constant";
import { socket } from "../../services/socket.service";
import { SOCKET_EVENTS } from "../../hooks/useRoomSocket";
import { BottomPanel } from "./BottomPanel";

type RightPanelProps = {
  language: Language;
  code: string;
  setCode: (value: string) => void;
  setLanguage: (value: Language) => void;
  onReset: () => void;
  roomCode: string;
  customInput: string;
  setCustomInput: (value: string) => void;
};

export const RightPanel = ({
  language,
  code,
  setCode,
  setLanguage,
  onReset,
  roomCode,
  customInput,
  setCustomInput,
}: RightPanelProps) => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="h-12 border-b border-gray-800 flex items-center justify-between px-4 bg-[#252526]">
        <select
          value={language}
          onChange={(e) => {
            const value = e.target.value as Language;
            setLanguage(value);
            setCode(DEFAULT_CODE[value]);
            socket.emit(SOCKET_EVENTS.LANGUAGE_CHANGED, {
              language: value,
              starterCode: DEFAULT_CODE[value],
            });
          }}
          className="bg-[#3c3c3c] text-gray-200 text-sm border-none rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
        <button
          onClick={onReset}
          className="text-gray-400 cursor-pointer hover:text-white p-1"
        >
          ↺
        </button>
      </div>
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 min-h-0">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={(value) => {
              const newCode = value ?? "";
              setCode(newCode);
              socket.emit(SOCKET_EVENTS.CODE_CHANGED, {
                code: newCode,
              });
            }}
            theme="vs-dark"
            options={{
              minimap: {
                enabled: false,
              },
              automaticLayout: true,
              fontSize: 15,
              scrollBeyondLastLine: false,
            }}
          />
        </div>
        <BottomPanel
          customInput={customInput}
          setCustomInput={setCustomInput}
          roomCode={roomCode}
          language={language}
          code={code}
        />
      </div>
    </div>
  );
};
