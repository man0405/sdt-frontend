"use client";
import { AccountInformation } from "@/components/profile/account-information";
import { Achievements } from "@/components/profile/achievements";
import { ActivityTimeline } from "@/components/profile/activity-timeline";
import { ApiUsageCard } from "@/components/profile/api-usage-card";
import { BioCard } from "@/components/profile/bio-card";
import { ConnectedAccounts } from "@/components/profile/connected-accounts";
import { PersonalInformation } from "@/components/profile/personal-information";
import { ProfileAvatar } from "@/components/profile/profile-avatar";
import { ProfileCompletion } from "@/components/profile/profile-completion";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileOverview } from "@/components/profile/profile-overview";
import { QuickActions } from "@/components/profile/quick-actions";
import { RecentSessions } from "@/components/profile/recent-sessions";
import { SecuritySummary } from "@/components/profile/security-summary";
import { SkillsCard } from "@/components/profile/skills-card";
import { SocialLinks } from "@/components/profile/social-links";
import { useState } from "react";

import { EditProfileDialog } from "@/components/profile/edit-profile-dialog";


export default function ProfilePage() {
    const [open, setOpen] = useState(false);
  return (
    <div className="space-y-6">

      <ProfileHeader onEdit={() => setOpen(true)} />

      <div className="grid gap-6 xl:grid-cols-12">

        {/* Left Sidebar */}

        <div className="space-y-6 xl:col-span-4">

          <ProfileAvatar />

          <ProfileCompletion />

          <QuickActions />

        </div>

        {/* Main Content */}

        <div className="space-y-6 xl:col-span-8">

          <ProfileOverview />

          <PersonalInformation onEdit={() => setOpen(true)} />

          <AccountInformation />

          <BioCard onEdit={() => setOpen(true)} />

          <SkillsCard onEdit={() => setOpen(true)} />

          <EditProfileDialog
                open={open}
                onOpenChange={setOpen}
                />

          <SocialLinks />

          <ConnectedAccounts />

          <SecuritySummary />

        </div>

      </div>

      {/* Bottom Section */}

      <div className="grid gap-6 xl:grid-cols-2">

        <ApiUsageCard />

        <RecentSessions />

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <ActivityTimeline />

        <Achievements />

      </div>

    </div>
  );
}