"use client";

import { Building2 } from "lucide-react";

import { AuthSuccessCard } from "@/components/auth/shared/auth-success-card";

interface WorkspaceSuccessProps {
  workspaceName: string;
  dashboardHref?: string;
  inviteHref?: string;
}

export function WorkspaceSuccess({
  workspaceName,
  dashboardHref = "/dashboard",
  inviteHref = "/team/invitations",
}: WorkspaceSuccessProps) {
  return (
    <AuthSuccessCard
      icon={<Building2 className="h-8 w-8 text-primary" />}
      title="Workspace Created"
      description={`"${workspaceName}" has been created successfully. You can start using your workspace or invite your teammates.`}
      primaryLabel="Go to Dashboard"
      primaryHref={dashboardHref}
      secondaryLabel="Invite Team Members"
      secondaryHref={inviteHref}
    />
  );
}