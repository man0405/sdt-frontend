"use client";

import { useChatContext } from "../context/use-chat-context";
import type { ChatMessage } from "../types";

export function useChat() {
  const {
    messages,
    addMessage,
    clearMessages,

    model,
    setModel,

    isGenerating,
    setIsGenerating,
  } = useChatContext();

  const sendMessage = async (
    content: string,
    files: File[] = []
  ) => {
    if (!content.trim() && files.length === 0) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date(),

      attachments: files.map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      })),
    };

    addMessage(userMessage);

    setIsGenerating(true);

    // Fake AI Response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "This is a simulated response. Later we'll connect OpenAI, Anthropic or Gemini.",
        createdAt: new Date(),
        model,
      };

      addMessage(assistantMessage);

      setIsGenerating(false);
    }, 1200);
  };

  const regenerate = (messageId: string) => {
    console.log("Regenerate", messageId);
  };

  const stopGeneration = () => {
    setIsGenerating(false);
  };

  return {
    messages,

    model,
    setModel,

    isGenerating,

    sendMessage,

    regenerate,

    stopGeneration,

    clearConversation: clearMessages,
  };
}