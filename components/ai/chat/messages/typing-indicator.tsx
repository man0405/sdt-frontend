"use client";
import { MessageAvatar } from "./message-avatar";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 py-6">
      <MessageAvatar role="assistant" />

      <div className="rounded-xl border bg-muted px-4 py-3">
        <div className="flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-foreground" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-foreground [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-foreground [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}