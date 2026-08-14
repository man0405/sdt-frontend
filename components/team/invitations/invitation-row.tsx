"use client";

import { Mail, MoreHorizontal, RefreshCw, X } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { RoleBadge, type TeamRole } from "@/components/team/members/role-badge";
import { InvitationStatusBadge, type InvitationStatus } from "./invitation-status-badge";

export interface Invitation {
  id: string;
  email: string;
  role: Exclude<TeamRole, "owner">;
  status: InvitationStatus;
  invitedBy: string;
  invitedAt: string;
}

interface InvitationRowProps {
  invitation: Invitation;
  onResend?: (id: string) => void;
  onCancel?: (id: string) => void;
}

export function InvitationRow({ invitation, onResend, onCancel }: InvitationRowProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 hover:bg-accent/50 transition-colors">
      <Avatar className="h-9 w-9 shrink-0">
        <AvatarFallback className="bg-muted">
          <Mail className="size-4 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{invitation.email}</p>
        <p className="text-xs text-muted-foreground truncate">
          Invited by {invitation.invitedBy} · {invitation.invitedAt}
        </p>
      </div>

      <RoleBadge role={invitation.role} />
      <InvitationStatusBadge status={invitation.status} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 shrink-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 rounded-xl p-1.5">
          {invitation.status !== "pending" ? (
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9"
              onClick={() => onResend?.(invitation.id)}
            >
              <RefreshCw className="size-4" />
              Resend
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9"
              onClick={() => onResend?.(invitation.id)}
            >
              <RefreshCw className="size-4" />
              Resend
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator className="my-1" />
          <DropdownMenuItem
            className="gap-2 rounded-lg h-9 text-destructive focus:text-destructive"
            onClick={() => onCancel?.(invitation.id)}
          >
            <X className="size-4" />
            Cancel invite
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}