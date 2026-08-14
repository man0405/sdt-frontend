"use client";

import { MessageAvatar } from "./message-avatar";

import { ChatMessage } from "../types";
import { MarkdownRenderer } from "./markdown-renderer";
import { MessageActions } from "./message-actions";

interface AssistantMessageProps {
  message: ChatMessage;
  onRegenerate: () => void;
}

export function AssistantMessage({
  message,
  onRegenerate,
}: AssistantMessageProps) {
  return (
    <div className="group flex gap-3 py-6">
      <MessageAvatar role="assistant" />

      <div className="flex-1">
        <div className="max-w-[80%] rounded-2xl border border-border/60 bg-muted/40 px-5 py-4 shadow-sm">
  {message.content}
</div>

        <MessageActions
          message={message}
          onRegenerate={onRegenerate}
        />
      </div>
    </div>
  );
}