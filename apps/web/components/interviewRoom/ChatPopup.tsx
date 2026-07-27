import { X } from "lucide-react";

import { MessageType } from "../../types/room.types";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";

type ChatPopupProps = {
  open: boolean;
  messages: MessageType[];
  currentUserId: string;
  onClose: () => void;
  roomCode: string;
};

export const ChatPopup = ({
  open,
  messages,
  currentUserId,
  onClose,
  roomCode,
}: ChatPopupProps) => {
  if (!open) return null;

  return (
    <div
      className="
        fixed bottom-5 right-5 z-50 flex h-[550px] w-[380px] flex-col overflow-hidden rounded-xl border border-neutral-700 bg-neutral-900 shadow-2xl
      "
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-neutral-700 px-4">
        <h2 className="text-lg font-semibold text-white">Interview Chat</h2>

        <button
          onClick={onClose}
          className="rounded-md p-1 text-neutral-400 transition hover:bg-neutral-800 hover:text-white cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center text-sm text-neutral-500">
            No messages yet.
            <br />
            Start the conversation.
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isMine={message.senderId === currentUserId}
            />
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-700 p-3">
        <MessageInput roomCode={roomCode} />
      </div>
    </div>
  );
};
