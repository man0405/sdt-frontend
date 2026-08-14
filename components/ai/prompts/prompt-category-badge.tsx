import { Badge } from "@/components/ui/badge";

export type PromptCategory =
  | "writing"
  | "coding"
  | "marketing"
  | "productivity"
  | "other";

const categoryConfig: Record<PromptCategory, { label: string; className: string }> = {
  writing: { label: "Writing", className: "bg-purple-500/10 text-purple-600" },
  coding: { label: "Coding", className: "bg-blue-500/10 text-blue-600" },
  marketing: { label: "Marketing", className: "bg-orange-500/10 text-orange-600" },
  productivity: { label: "Productivity", className: "bg-emerald-500/10 text-emerald-600" },
  other: { label: "Other", className: "bg-muted text-muted-foreground" },
};

interface PromptCategoryBadgeProps {
  category: PromptCategory;
}

export function PromptCategoryBadge({ category }: PromptCategoryBadgeProps) {
  const config = categoryConfig[category];
  return (
    <Badge variant="secondary" className={`text-[10px] border-0 ${config.className}`}>
      {config.label}
    </Badge>
  );
}