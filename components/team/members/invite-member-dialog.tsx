"use client";

import { useState } from "react";
import { UserPlus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import type { TeamRole } from "./role-badge";

interface InviteEntry {
  id: string;
  email: string;
  role: Exclude<TeamRole, "owner">;
}

interface InviteMemberDialogProps {
  onInvite?: (invites: { email: string; role: Exclude<TeamRole, "owner"> }[]) => void;
}

export function InviteMemberDialog({ onInvite }: InviteMemberDialogProps) {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<InviteEntry[]>([
    { id: crypto.randomUUID(), email: "", role: "member" },
  ]);

  const addEntry = () => {
    setEntries((prev) => [...prev, { id: crypto.randomUUID(), email: "", role: "member" }]);
  };

  const removeEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const updateEntry = (id: string, field: "email" | "role", value: string) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const validEntries = entries.filter((e) => e.email.trim());

  const handleSubmit = () => {
    if (validEntries.length === 0) return;
    onInvite?.(validEntries.map(({ email, role }) => ({ email, role })));
    setEntries([{ id: crypto.randomUUID(), email: "", role: "member" }]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1.5">
          <UserPlus className="size-4" />
          Invite members
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle>Invite team members</DialogTitle>
          <DialogDescription>
            Send invitations by email. They'll receive a link to join your workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2 max-h-[300px] overflow-y-auto">
          {entries.map((entry) => (
            <div key={entry.id} className="flex items-center gap-2">
              <Input
                placeholder="colleague@company.com"
                value={entry.email}
                onChange={(e) => updateEntry(entry.id, "email", e.target.value)}
                className="flex-1"
              />
              <Select
                value={entry.role}
                onValueChange={(v) => updateEntry(entry.id, "role", v)}
              >
                <SelectTrigger className="w-28 shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              {entries.length > 1 && (
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="shrink-0 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          ))}

          <Button variant="ghost" size="sm" onClick={addEntry} className="text-xs">
            + Add another
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={validEntries.length === 0}>
            Send {validEntries.length > 0 ? `${validEntries.length} ` : ""}invite
            {validEntries.length !== 1 ? "s" : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}