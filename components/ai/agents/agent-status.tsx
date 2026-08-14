import { Badge } from "@/components/ui/badge";

export type AgentStatus = "active" | "draft";

interface AgentStatusProps {
  status: AgentStatus;
}

export function AgentStatus({ status }: AgentStatusProps) {
  return (
    <Badge
      variant={status === "active" ? "default" : "secondary"}
      className="text-[10px]"
    >
      {status === "active" ? "Active" : "Draft"}
    </Badge>
  );
}