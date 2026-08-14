import { Bot } from "lucide-react";
import { CreateAgentDialog } from "./create-agent-dialog";

interface AgentsEmptyStateProps {
  onCreate?: (agent: {
    name: string;
    description: string;
    icon: string;
    model: string;
    instructions: string;
    enabledTools: string[];
  }) => void;
}

export function AgentsEmptyState({ onCreate }: AgentsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 px-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
        <Bot className="size-7 text-primary" />
      </span>

      <h3 className="text-lg font-semibold mb-1">No agents yet</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        Create your first AI agent with custom instructions, tools, and a
        dedicated model to automate specific tasks.
      </p>

      <CreateAgentDialog onCreate={onCreate} />
    </div>
  );
}