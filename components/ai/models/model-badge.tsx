import { type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ModelBadgeProps {
  icon: LucideIcon;
  label: string;
}

export function ModelBadge({ icon: Icon, label }: ModelBadgeProps) {
  return (
    <Badge variant="secondary" className="gap-1 text-[10px] font-normal">
      <Icon className="size-3" />
      {label}
    </Badge>
  );
}