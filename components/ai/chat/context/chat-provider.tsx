"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { ChatMessage } from "../types";

interface ChatContextValue {
  // Conversation
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;

  // Current input
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;

  // Selected model
  model: string;
  setModel: React.Dispatch<React.SetStateAction<string>>;

  // AI generation state
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatContext = createContext<ChatContextValue | null>(null);

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({
  children,
}: ChatProviderProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("claude-sonnet-4");
  const [isGenerating, setIsGenerating] = useState(false);

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const value = useMemo(
    () => ({
      messages,
      setMessages,
      addMessage,
      clearMessages,

      input,
      setInput,

      model,
      setModel,

      isGenerating,
      setIsGenerating,
    }),
    [
      messages,
      input,
      model,
      isGenerating,
    ]
  );

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error(
      "useChatContext must be used within ChatProvider."
    );
  }

  return context;
}