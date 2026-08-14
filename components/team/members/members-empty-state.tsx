import { Users } from "lucide-react";
import { InviteMemberDialog } from "./invite-member-dialog";
import type { TeamRole } from "./role-badge";

interface MembersEmptyStateProps {
  onInvite?: (invites: { email: string; role: Exclude<TeamRole, "owner"> }[]) => void;
}

export function MembersEmptyState({ onInvite }: MembersEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 px-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
        <Users className="size-7 text-primary" />
      </span>

      <h3 className="text-lg font-semibold mb-1">No team members yet</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        Invite colleagues to collaborate on chats, agents, and projects together.
      </p>

      <InviteMemberDialog onInvite={onInvite} />
    </div>
  );
}