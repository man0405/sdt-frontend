"use client";

import { Sparkles } from "lucide-react";

import { PromptSuggestions } from "../input/prompt-suggestions";

interface ChatEmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
}

export function ChatEmptyState({
  onSelectPrompt,
}: ChatEmptyStateProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto flex min-h-full max-w-3xl flex-col items-center justify-center px-6 py-10">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
          <Sparkles className="h-7 w-7" />
        </div>

        <h1 className="text-center text-3xl font-bold tracking-tight">
          Hi Virendra 👋
        </h1>

        <p className="mt-2 text-center text-muted-foreground">
          How can I help you today?
        </p>

        <div className="mt-10 w-full pb-12">
          <PromptSuggestions
            onSelect={onSelectPrompt}
          />
        </div>
      </div>
    </div>
  );
}