"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WorkspaceSlugInputProps {
  workspaceName: string;
  slug: string;
  disabled?: boolean;
  baseUrl?: string;
  onChange: (slug: string) => void;
}

export function WorkspaceSlugInput({
  workspaceName,
  slug,
  disabled = false,
  baseUrl = "app.codervent.com",
  onChange,
}: WorkspaceSlugInputProps) {
  const [manualEdit, setManualEdit] = useState(false);

  useEffect(() => {
    if (manualEdit) return;

    const generatedSlug = workspaceName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    if (generatedSlug !== slug) {
      onChange(generatedSlug);
    }
  }, [
    workspaceName,
    slug,
    manualEdit,
    onChange,
  ]);

  return (
    <div className="space-y-2">
      <Label htmlFor="workspace-slug">
        Workspace URL
      </Label>

      <div className="flex overflow-hidden rounded-md border focus-within:ring-2 focus-within:ring-ring">
        <div className="flex items-center border-r bg-muted px-3 text-sm text-muted-foreground">
          {baseUrl}/
        </div>

        <Input
          id="workspace-slug"
          value={slug}
          disabled={disabled}
          onChange={(e) => {
            setManualEdit(true);

            onChange(
              e.target.value
                .toLowerCase()
                .replace(/[^a-z0-9-]/g, "")
            );
          }}
          className="border-0 rounded-none focus-visible:ring-0"
          placeholder="workspace-name"
        />
      </div>

      <p className="text-xs text-muted-foreground">
        This will be your workspace URL and can be changed later.
      </p>
    </div>
  );
}