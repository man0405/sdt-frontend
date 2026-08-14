import { MailPlus } from "lucide-react";
import { InviteMemberDialog } from "@/components/team/members/invite-member-dialog";
import type { TeamRole } from "@/components/team/members/role-badge";

interface InvitationsEmptyStateProps {
  onInvite?: (invites: { email: string; role: Exclude<TeamRole, "owner"> }[]) => void;
}

export function InvitationsEmptyState({ onInvite }: InvitationsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 px-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
        <MailPlus className="size-7 text-primary" />
      </span>

      <h3 className="text-lg font-semibold mb-1">No pending invitations</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        Invitations you send will appear here until they're accepted.
      </p>

      <InviteMemberDialog onInvite={onInvite} />
    </div>
  );
}