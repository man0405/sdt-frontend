import { Sparkles } from "lucide-react";
import { CreatePromptDialog } from "./create-prompt-dialog";
import type { PromptCategory } from "./prompt-category-badge";

interface PromptsEmptyStateProps {
  onCreate?: (data: {
    title: string;
    template: string;
    category: PromptCategory;
  }) => void;
}

export function PromptsEmptyState({ onCreate }: PromptsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 px-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
        <Sparkles className="size-7 text-primary" />
      </span>

      <h3 className="text-lg font-semibold mb-1">No prompts yet</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        Save reusable prompt templates with variables so you and your team can
        run them instantly.
      </p>

      <CreatePromptDialog onCreate={onCreate} />
    </div>
  );
}