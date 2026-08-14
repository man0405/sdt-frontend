import { FileStack } from "lucide-react";
import { CreateKnowledgeBaseDialog } from "./create-knowledge-base-dialog";

interface KnowledgeEmptyStateProps {
  onCreate?: (data: { name: string; description: string; sourceType: string }) => void;
}

export function KnowledgeEmptyState({ onCreate }: KnowledgeEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 px-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
        <FileStack className="size-7 text-primary" />
      </span>

      <h3 className="text-lg font-semibold mb-1">No knowledge bases yet</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        Add documents, websites, or databases so your agents and chats have
        context to reference.
      </p>

      <CreateKnowledgeBaseDialog onCreate={onCreate} />
    </div>
  );
}