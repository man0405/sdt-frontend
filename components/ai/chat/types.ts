export type ChatRole = "user" | "assistant" | "system";

export interface ChatAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;

  createdAt: Date;

  model?: string;

  attachments?: ChatAttachment[];

  isStreaming?: boolean;

  error?: boolean;
}

export interface Conversation {
  id: string;

  title: string;

  createdAt: Date;

  updatedAt: Date;

  model: string;

  messages: ChatMessage[];
}

export interface PromptSuggestion {
  id: string;
  title: string;
  description: string;
  prompt: string;
  icon?: React.ReactNode;
}