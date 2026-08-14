"use client";

import { useState } from "react";

import { SettingsSection } from "@/components/settings/settings-section";
import { SettingsRow } from "@/components/settings/settings-row";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface NotificationPrefs {
  email: Record<string, boolean>;
  push: Record<string, boolean>;
}

const emailEvents = [
  { id: "mentions", label: "Mentions & replies", description: "When someone mentions you in a shared chat" },
  { id: "usage_alerts", label: "Usage alerts", description: "When you're close to your credit limit" },
  { id: "billing", label: "Billing updates", description: "Invoices, payment failures, plan changes" },
  { id: "team_activity", label: "Team activity", description: "New members, role changes" },
  { id: "product_updates", label: "Product updates", description: "New features and announcements" },
  { id: "security", label: "Security alerts", description: "New sign-ins and password changes" },
];

const pushEvents = [
  { id: "mentions", label: "Mentions & replies", description: "When someone mentions you in a shared chat" },
  { id: "workflow_complete", label: "Workflow completed", description: "When an automated workflow finishes running" },
  { id: "agent_errors", label: "Agent errors", description: "When an agent run fails" },
];

const defaultPrefs: NotificationPrefs = {
  email: {
    mentions: true,
    usage_alerts: true,
    billing: true,
    team_activity: false,
    product_updates: true,
    security: true,
  },
  push: {
    mentions: true,
    workflow_complete: false,
    agent_errors: true,
  },
};

export default function NotificationsSettingsPage() {
  const [prefs, setPrefs] = useState<NotificationPrefs>(defaultPrefs);
  const [saving, setSaving] = useState(false);

  const toggle = (channel: "email" | "push", id: string) => {
    setPrefs((prev) => ({
      ...prev,
      [channel]: { ...prev[channel], [id]: !prev[channel][id] },
    }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 800);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Choose what you want to be notified about.
        </p>
      </div>

      <SettingsSection
        title="Email notifications"
        description="Sent to your account email address."
        footer={
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </Button>
        }
      >
        {emailEvents.map((event) => (
          <SettingsRow key={event.id} label={event.label} description={event.description}>
            <Switch
              checked={prefs.email[event.id] ?? false}
              onCheckedChange={() => toggle("email", event.id)}
            />
          </SettingsRow>
        ))}
      </SettingsSection>

      <SettingsSection
        title="Push notifications"
        description="Sent to your browser or mobile device."
        footer={
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </Button>
        }
      >
        {pushEvents.map((event) => (
          <SettingsRow key={event.id} label={event.label} description={event.description}>
            <Switch
              checked={prefs.push[event.id] ?? false}
              onCheckedChange={() => toggle("push", event.id)}
            />
          </SettingsRow>
        ))}
      </SettingsSection>
    </div>
  );
}