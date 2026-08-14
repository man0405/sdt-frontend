import { Badge } from "@/components/ui/badge";

export type InvitationStatus = "pending" | "expired" | "declined";

const statusConfig: Record<InvitationStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-500/10 text-amber-600" },
  expired: { label: "Expired", className: "bg-muted text-muted-foreground" },
  declined: { label: "Declined", className: "bg-destructive/10 text-destructive" },
};

interface InvitationStatusBadgeProps {
  status: InvitationStatus;
}

export function InvitationStatusBadge({ status }: InvitationStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant="secondary" className={`gap-1 text-[10px] border-0 ${config.className}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {config.label}
    </Badge>
  );
}