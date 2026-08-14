import { Badge } from "@/components/ui/badge";

export type WorkflowStatus = "active" | "paused" | "draft";

const statusConfig: Record<WorkflowStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-emerald-500/10 text-emerald-600" },
  paused: { label: "Paused", className: "bg-amber-500/10 text-amber-600" },
  draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
};

interface WorkflowStatusBadgeProps {
  status: WorkflowStatus;
}

export function WorkflowStatusBadge({ status }: WorkflowStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant="secondary" className={`text-[10px] border-0 gap-1 ${config.className}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {config.label}
    </Badge>
  );
}