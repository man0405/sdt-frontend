"use client";

import { ChatMessage as ChatMessageType } from "../types";

import { AssistantMessage } from "./assistant-message";
import { UserMessage } from "./user-message";

interface ChatMessageProps {
  message: ChatMessageType;
  onRegenerate: () => void;
}

export function ChatMessage({
  message,
  onRegenerate,
}: ChatMessageProps) {
  switch (message.role) {
    case "assistant":
      return (
        <AssistantMessage
          message={message}
          onRegenerate={onRegenerate}
        />
      );

    case "user":
      return (
        <UserMessage
          message={message}
        />
      );

    default:
      return null;
  }
}