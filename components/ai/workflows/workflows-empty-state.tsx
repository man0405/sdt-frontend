import { Workflow } from "lucide-react";
import { CreateWorkflowDialog } from "./create-workflow-dialog";

interface WorkflowsEmptyStateProps {
  onCreate?: (data: {
    name: string;
    description: string;
    trigger: string;
    steps: { id: string; label: string; iconId: string }[];
  }) => void;
}

export function WorkflowsEmptyState({ onCreate }: WorkflowsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 px-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
        <Workflow className="size-7 text-primary" />
      </span>

      <h3 className="text-lg font-semibold mb-1">No workflows yet</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        Chain multiple AI steps together to automate repetitive tasks, end to
        end.
      </p>

      <CreateWorkflowDialog onCreate={onCreate} />
    </div>
  );
}