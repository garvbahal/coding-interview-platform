import { useState } from "react";
import { SendHorizontal } from "lucide-react";

import { socket } from "../../services/socket.service";
import { SOCKET_EVENTS } from "../../hooks/useRoomSocket";

type MessageInputProps = {
  roomCode: string;
};

export const MessageInput = ({ roomCode }: MessageInputProps) => {
  const [text, setText] = useState("");

  const sendMessage = () => {
    console.log(text);
    console.log("In frontend and sending message to the socket");
    if (!text.trim()) return;

    socket.emit(SOCKET_EVENTS.SEND_MESSAGE, {
      message: text,
    });

    setText("");
  };

  return (
    <div className="flex items-end gap-2">
      <textarea
        rows={1}
        value={text}
        placeholder="Type a message..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        className="
          flex-1 resize-none rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-blue-500
        "
      />

      <button
        onClick={sendMessage}
        className="rounded-lg bg-blue-600 p-2.5 text-white transition hover:bg-blue-700 cursor-pointer"
      >
        <SendHorizontal size={18} />
      </button>
    </div>
  );
};
