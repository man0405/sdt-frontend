import { type LucideIcon, FileText, Globe, Database, Cloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type SourceType = "file" | "url" | "database" | "integration";

const sourceConfig: Record<SourceType, { icon: LucideIcon; label: string }> = {
  file: { icon: FileText, label: "Files" },
  url: { icon: Globe, label: "Website" },
  database: { icon: Database, label: "Database" },
  integration: { icon: Cloud, label: "Integration" },
};

interface KnowledgeSourceBadgeProps {
  type: SourceType;
}

export function KnowledgeSourceBadge({ type }: KnowledgeSourceBadgeProps) {
  const config = sourceConfig[type];
  return (
    <Badge variant="secondary" className="gap-1 text-[10px] font-normal">
      <config.icon className="size-3" />
      {config.label}
    </Badge>
  );
}