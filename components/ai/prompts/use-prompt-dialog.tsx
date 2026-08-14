"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { Prompt } from "./prompt-card";

interface UsePromptDialogProps {
  prompt: Prompt | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRun: (filledPrompt: string) => void;
}

function extractVariables(template: string): string[] {
  const matches = template.match(/\{\{(\w+)\}\}/g) ?? [];
  return Array.from(new Set(matches.map((m) => m.replace(/[{}]/g, ""))));
}

export function UsePromptDialog({
  prompt,
  open,
  onOpenChange,
  onRun,
}: UsePromptDialogProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  const variables = useMemo(
    () => (prompt ? extractVariables(prompt.template) : []),
    [prompt]
  );

  useEffect(() => {
    if (prompt) {
      const initial: Record<string, string> = {};
      extractVariables(prompt.template).forEach((v) => (initial[v] = ""));
      setValues(initial);
    }
  }, [prompt]);

  if (!prompt) return null;

  const filledPreview = variables.reduce(
    (text, v) =>
      text.replace(new RegExp(`\\{\\{${v}\\}\\}`, "g"), values[v] || `{{${v}}}`),
    prompt.template
  );

  const allFilled = variables.every((v) => values[v]?.trim());

  const handleRun = () => {
    onRun(filledPreview);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle>{prompt.title}</DialogTitle>
          <DialogDescription>
            Fill in the details below to run this prompt.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {variables.length > 0 ? (
            variables.map((v) => (
              <div key={v} className="space-y-2">
                <Label htmlFor={`var-${v}`} className="capitalize">
                  {v.replace(/_/g, " ")}
                </Label>
                <Input
                  id={`var-${v}`}
                  value={values[v] || ""}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, [v]: e.target.value }))
                  }
                  placeholder={`Enter ${v.replace(/_/g, " ")}...`}
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              This prompt has no variables — it'll run as-is.
            </p>
          )}

          <div className="rounded-lg border bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground mb-1.5">Preview</p>
            <p className="text-sm whitespace-pre-wrap">{filledPreview}</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleRun} disabled={variables.length > 0 && !allFilled}>
            Run prompt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}