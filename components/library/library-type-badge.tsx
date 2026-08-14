import { type LucideIcon, MessageSquare, Image as ImageIcon, FileText, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type LibraryItemType = "chat" | "image" | "file" | "agent_output";

const typeConfig: Record<LibraryItemType, { icon: LucideIcon; label: string; className: string }> = {
  chat: { icon: MessageSquare, label: "Chat", className: "bg-primary/10 text-primary" },
  image: { icon: ImageIcon, label: "Image", className: "bg-purple-500/10 text-purple-600" },
  file: { icon: FileText, label: "File", className: "bg-blue-500/10 text-blue-600" },
  agent_output: { icon: Bot, label: "Agent output", className: "bg-emerald-500/10 text-emerald-600" },
};

interface LibraryTypeBadgeProps {
  type: LibraryItemType;
}

export function LibraryTypeBadge({ type }: LibraryTypeBadgeProps) {
  const config = typeConfig[type];
  return (
    <Badge variant="secondary" className={`gap-1 text-[10px] border-0 ${config.className}`}>
      <config.icon className="size-3" />
      {config.label}
    </Badge>
  );
}

export { typeConfig };