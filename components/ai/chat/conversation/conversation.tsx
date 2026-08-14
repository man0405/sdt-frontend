"use client";

import { useRef } from "react";

import type { ChatMessage as ChatMessageType } from "../types";
import { useScroll } from "../hooks/use-scroll";
import { ChatMessage } from "../messages/chat-message";
import { TypingIndicator } from "../messages/typing-indicator";

interface ConversationProps {
  messages: ChatMessageType[];
  isGenerating: boolean;
  onRegenerate: (id: string) => void;
}

export function Conversation({
  messages,
  isGenerating,
  onRegenerate,
}: ConversationProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useScroll(scrollRef, [messages, isGenerating]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl px-4 py-6 pb-32">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onRegenerate={() => onRegenerate(message.id)}
          />
        ))}

        {isGenerating && <TypingIndicator />}

        <div ref={scrollRef} />
      </div>
    </div>
  );
}