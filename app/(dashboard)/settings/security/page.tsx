"use client";

import { useState } from "react";

import { SettingsSection } from "@/components/settings/settings-section";
import { SessionRow, type Session } from "@/components/settings/security/session-row";
import { TwoFactorDialog } from "@/components/settings/security/two-factor-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const initialSessions: Session[] = [
  {
    id: "1",
    device: "Chrome on Windows",
    deviceType: "desktop",
    location: "Ghaziabad, India",
    lastActive: "Active now",
    isCurrent: true,
  },
  {
    id: "2",
    device: "Safari on iPhone",
    deviceType: "mobile",
    location: "Ghaziabad, India",
    lastActive: "2h ago",
    isCurrent: false,
  },
  {
    id: "3",
    device: "Chrome on macOS",
    deviceType: "desktop",
    location: "Mumbai, India",
    lastActive: "5d ago",
    isCurrent: false,
  },
];

export default function SecuritySettingsPage() {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const handleRevoke = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleRevokeAll = () => {
    setSessions((prev) => prev.filter((s) => s.isCurrent));
  };

  const handleChangePassword = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 800);
  };

  const passwordsValid =
    currentPassword.length > 0 &&
    newPassword.length >= 8 &&
    newPassword === confirmPassword;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Security</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your password, two-factor authentication, and active sessions.
        </p>
      </div>

      <SettingsSection
        title="Password"
        description="Change your account password."
        footer={
          <Button
            size="sm"
            onClick={handleChangePassword}
            disabled={saving || !passwordsValid}
          >
            {saving ? "Updating..." : "Update password"}
          </Button>
        }
      >
        <div className="space-y-2">
          <Label htmlFor="current-password">Current password</Label>
          <Input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">New password</Label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Minimum 8 characters.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm new password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </SettingsSection>

      <SettingsSection
        title="Two-factor authentication"
        description="Add an extra layer of security to your account."
      >
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm font-medium">Authenticator app</p>
              <p className="text-xs text-muted-foreground">
                Use an app like Google Authenticator or 1Password.
              </p>
            </div>
          </div>

          {twoFactorEnabled ? (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-0">
                Enabled
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTwoFactorEnabled(false)}
              >
                Disable
              </Button>
            </div>
          ) : (
            <TwoFactorDialog onEnable={() => setTwoFactorEnabled(true)} />
          )}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Active sessions"
        description="Devices currently signed in to your account."
        footer={
          sessions.length > 1 ? (
            <Button variant="outline" size="sm" onClick={handleRevokeAll}>
              Sign out all other sessions
            </Button>
          ) : undefined
        }
      >
        <div className="divide-y">
          {sessions.map((session) => (
            <SessionRow key={session.id} session={session} onRevoke={handleRevoke} />
          ))}
        </div>
      </SettingsSection>
    </div>
  );
}