"use client";

import { MoreHorizontal, Shield, UserMinus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { RoleBadge, type TeamRole } from "./role-badge";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: TeamRole;
  status: "online" | "offline";
  joinedAt: string;
}

interface MemberRowProps {
  member: TeamMember;
  currentUserRole: TeamRole;
  onChangeRole?: (id: string, role: TeamRole) => void;
  onRemove?: (id: string) => void;
}

export function MemberRow({
  member,
  currentUserRole,
  onChangeRole,
  onRemove,
}: MemberRowProps) {
  const canManage =
    (currentUserRole === "owner" || currentUserRole === "admin") &&
    member.role !== "owner";

  return (
    <div className="flex items-center gap-3 px-4 py-3.5 hover:bg-accent/50 transition-colors">
      <div className="relative shrink-0">
        <Avatar className="h-9 w-9">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span
          className={`absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background ${
            member.status === "online" ? "bg-emerald-500" : "bg-muted-foreground/40"
          }`}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{member.name}</p>
        <p className="text-xs text-muted-foreground truncate">{member.email}</p>
      </div>

      <span className="text-xs text-muted-foreground shrink-0 hidden sm:block">
        Joined {member.joinedAt}
      </span>

      <RoleBadge role={member.role} />

      {canManage ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8 shrink-0">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 rounded-xl p-1.5">
            <DropdownMenuLabel className="text-xs text-muted-foreground px-2">
              Change role
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9"
              onClick={() => onChangeRole?.(member.id, "admin")}
            >
              <Shield className="size-4" />
              Admin
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9"
              onClick={() => onChangeRole?.(member.id, "member")}
            >
              Member
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9"
              onClick={() => onChangeRole?.(member.id, "viewer")}
            >
              Viewer
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9 text-destructive focus:text-destructive"
              onClick={() => onRemove?.(member.id)}
            >
              <UserMinus className="size-4" />
              Remove from team
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <span className="size-8 shrink-0" />
      )}
    </div>
  );
}