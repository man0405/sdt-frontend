"use client";

import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface KnowledgeSettingsProps {
  name: string;
  description: string;
  autoSync?: boolean;
  isPublic?: boolean;
  onSave?: (data: {
    name: string;
    description: string;
    autoSync: boolean;
    isPublic: boolean;
  }) => void;
  onDelete?: () => void;
}

export function KnowledgeSettings({
  name,
  description,
  autoSync = true,
  isPublic = false,
  onSave,
  onDelete,
}: KnowledgeSettingsProps) {
  const [form, setForm] = useState({
    name,
    description,
    autoSync,
    isPublic,
  });

  const handleSave = () => {
    onSave?.(form);
  };

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your knowledge base configuration.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Knowledge Base Name</Label>

            <Input
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>

            <Textarea
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>Auto Sync</Label>

              <p className="text-sm text-muted-foreground">
                Automatically sync connected data sources.
              </p>
            </div>

            <Switch
              checked={form.autoSync}
              onCheckedChange={(checked) =>
                setForm((prev) => ({
                  ...prev,
                  autoSync: checked,
                }))
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>Public Access</Label>

              <p className="text-sm text-muted-foreground">
                Allow this knowledge base to be used by all agents.
              </p>
            </div>

            <Switch
              checked={form.isPublic}
              onCheckedChange={(checked) =>
                setForm((prev) => ({
                  ...prev,
                  isPublic: checked,
                }))
              }
            />
          </div>

          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>

          <CardDescription>
            Permanently delete this knowledge base and all indexed documents.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">
              Delete Knowledge Base
            </h4>

            <p className="text-sm text-muted-foreground">
              This action cannot be undone.
            </p>
          </div>

          <Button
            variant="destructive"
            onClick={onDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}