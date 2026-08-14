import { Badge } from "@/components/ui/badge";

export type InvoiceStatus = "paid" | "pending" | "failed" | "refunded";

const statusConfig: Record<InvoiceStatus, { label: string; className: string }> = {
  paid: { label: "Paid", className: "bg-emerald-500/10 text-emerald-600" },
  pending: { label: "Pending", className: "bg-amber-500/10 text-amber-600" },
  failed: { label: "Failed", className: "bg-destructive/10 text-destructive" },
  refunded: { label: "Refunded", className: "bg-muted text-muted-foreground" },
};

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
}

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant="secondary" className={`text-[10px] border-0 gap-1 ${config.className}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {config.label}
    </Badge>
  );
}