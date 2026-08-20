import { FolderKanban } from "lucide-react";

import { CreateProjectDialog } from "./create-project-dialog";
import type { ProjectDraft } from "./project";

interface WorkspaceEmptyStateProps {
  onCreate?: (data: ProjectDraft) => void;
}

export function WorkspaceEmptyState({ onCreate }: WorkspaceEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 px-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
        <FolderKanban className="size-7 text-primary" />
      </span>

      <h3 className="text-lg font-semibold mb-1">No projects yet</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        Create a project to organize related chats, agents, and files in one
        place.
      </p>

      <CreateProjectDialog onCreate={onCreate} />
    </div>
  );
}