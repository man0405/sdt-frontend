import { Badge } from "@/components/ui/badge";

export type TeamRole = "owner" | "admin" | "member" | "viewer";

const roleConfig: Record<TeamRole, { label: string; className: string }> = {
  owner: { label: "Owner", className: "bg-primary/10 text-primary" },
  admin: { label: "Admin", className: "bg-purple-500/10 text-purple-600" },
  member: { label: "Member", className: "bg-blue-500/10 text-blue-600" },
  viewer: { label: "Viewer", className: "bg-muted text-muted-foreground" },
};

interface RoleBadgeProps {
  role: TeamRole;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const config = roleConfig[role];
  return (
    <Badge variant="secondary" className={`text-[10px] border-0 ${config.className}`}>
      {config.label}
    </Badge>
  );
}