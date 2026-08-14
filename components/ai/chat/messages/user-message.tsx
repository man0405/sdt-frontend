"use client";

import { ChatMessage } from "../types";
import { MessageAvatar } from "./message-avatar";
import { MessageAttachments } from "./message-attachments";

interface UserMessageProps {
  message: ChatMessage;
}

export function UserMessage({
  message,
}: UserMessageProps) {
  return (
    <div className="group flex justify-end gap-3 py-6">
      <div className="max-w-[80%]">

        {message.attachments &&
          message.attachments.length > 0 && (
            <MessageAttachments
              attachments={message.attachments}
            />
          )}

        {message.content && (
          <div className="rounded-2xl bg-primary px-4 py-3 text-sm text-primary-foreground shadow-sm">
            {message.content}
          </div>
        )}
      </div>

      <MessageAvatar role="user" />
    </div>
  );
}