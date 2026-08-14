"use client";

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

import { SettingsSection } from "@/components/settings/settings-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function WorkspaceSettingsPage() {
  const [workspaceName, setWorkspaceName] = useState("Codervent");
  const [slug, setSlug] = useState("codervent");
  const [defaultModel, setDefaultModel] = useState("sonnet-5");
  const [confirmText, setConfirmText] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 800);
  };

  const canDelete = confirmText === workspaceName;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Workspace</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage settings for your entire workspace.
        </p>
      </div>

      <SettingsSection
        title="Workspace logo"
        description="Displayed in the sidebar and shared links."
        footer={
          <>
            <Button variant="outline" size="sm">
              Remove
            </Button>
            <Button size="sm">Upload logo</Button>
          </>
        }
      >
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
            <ImageIcon className="size-6 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground">
            Square image recommended. PNG or SVG, max 2MB.
          </p>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Workspace details"
        description="Update your workspace name and URL."
        footer={
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </Button>
        }
      >
        <div className="space-y-2">
          <Label htmlFor="workspace-name">Workspace name</Label>
          <Input
            id="workspace-name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="workspace-slug">Workspace URL</Label>
          <div className="flex items-center rounded-md border">
            <span className="px-3 text-sm text-muted-foreground border-r py-2 bg-muted/50">
              orbit.app/
            </span>
            <Input
              id="workspace-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="border-0 rounded-l-none"
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Default AI model"
        description="Used for new chats unless overridden per conversation."
        footer={
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </Button>
        }
      >
        <div className="space-y-2">
          <Label>Model</Label>
          <Select value={defaultModel} onValueChange={setDefaultModel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sonnet-5">Claude Sonnet 5</SelectItem>
              <SelectItem value="opus-4-8">Claude Opus 4.8</SelectItem>
              <SelectItem value="haiku-4-5">Claude Haiku 4.5</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Danger zone"
        description="Irreversible and destructive actions for this workspace."
      >
        <div className="flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <div>
            <p className="text-sm font-medium">Delete workspace</p>
            <p className="text-xs text-muted-foreground">
              Permanently deletes all chats, agents, projects, and data.
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Delete workspace
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm rounded-2xl">
              <DialogHeader>
                <DialogTitle>Delete "{workspaceName}"?</DialogTitle>
                <DialogDescription>
                  This will permanently delete all data in this workspace.
                  This action cannot be undone.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-2 py-2">
                <Label htmlFor="confirm-delete">
                  Type <span className="font-semibold">{workspaceName}</span> to
                  confirm
                </Label>
                <Input
                  id="confirm-delete"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder={workspaceName}
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setConfirmText("")}>
                  Cancel
                </Button>
                <Button variant="destructive" disabled={!canDelete}>
                  Delete workspace
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </SettingsSection>
    </div>
  );
}