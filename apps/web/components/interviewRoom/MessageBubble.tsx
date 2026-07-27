import { MessageType } from "../../types/room.types";

type MessageBubbleProps = {
  message: MessageType;
  isMine: boolean;
};

export const MessageBubble = ({ message, isMine }: MessageBubbleProps) => {
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[80%]">
        {!isMine && (
          <p className="mb-1 text-xs text-neutral-400">{message.sender.name}</p>
        )}

        <div
          className={`rounded-2xl px-4 py-2 text-sm break-words ${
            isMine ? "bg-blue-600 text-white" : "bg-neutral-800 text-white"
          }`}
        >
          {message.message}
        </div>

        <p
          className={`mt-1 text-xs text-neutral-500 ${
            isMine ? "text-right" : "text-left"
          }`}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};
