"use client";

import { useState } from "react";
import {
  Plus,
  X,
  MessageSquare,
  FileText,
  Mail,
  Database,
  Webhook,
  GripVertical,
} from "lucide-react";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stepOptions = [
  { id: "chat", label: "AI Chat", icon: MessageSquare },
  { id: "document", label: "Analyze Document", icon: FileText },
  { id: "email", label: "Send Email", icon: Mail },
  { id: "database", label: "Query Database", icon: Database },
  { id: "webhook", label: "Call Webhook", icon: Webhook },
];

interface DraftStep {
  id: string;
  optionId: string;
  label: string;
}

interface CreateWorkflowDialogProps {
  onCreate?: (data: {
    name: string;
    description: string;
    trigger: string;
    steps: { id: string; label: string; iconId: string }[];
  }) => void;
}

export function CreateWorkflowDialog({ onCreate }: CreateWorkflowDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [trigger, setTrigger] = useState("manual");
  const [steps, setSteps] = useState<DraftStep[]>([]);

  const addStep = (optionId: string) => {
    const option = stepOptions.find((o) => o.id === optionId);
    if (!option) return;
    setSteps((prev) => [
      ...prev,
      { id: crypto.randomUUID(), optionId, label: option.label },
    ]);
  };

  const removeStep = (id: string) => {
    setSteps((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSubmit = () => {
    if (!name.trim() || steps.length === 0) return;

    onCreate?.({
      name,
      description,
      trigger,
      steps: steps.map((s) => ({ id: s.id, label: s.label, iconId: s.optionId })),
    });

    setName("");
    setDescription("");
    setTrigger("manual");
    setSteps([]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1.5">
          <Plus className="size-4" />
          Create workflow
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a workflow</DialogTitle>
          <DialogDescription>
            Chain multiple AI steps together to automate a task.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="workflow-name">Name</Label>
            <Input
              id="workflow-name"
              placeholder="e.g. New lead enrichment"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workflow-description">Description</Label>
            <Input
              id="workflow-description"
              placeholder="What does this workflow do?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Trigger</Label>
            <Select value={trigger} onValueChange={setTrigger}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="schedule">Scheduled</SelectItem>
                <SelectItem value="webhook">Webhook</SelectItem>
                <SelectItem value="event">On event</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Steps</Label>

            {steps.length > 0 && (
              <div className="space-y-1.5 mb-2">
                {steps.map((step, i) => (
                  <div
                    key={step.id}
                    className="flex items-center gap-2 rounded-lg border px-3 py-2"
                  >
                    <GripVertical className="size-4 text-muted-foreground shrink-0" />
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-medium text-primary">
                      {i + 1}
                    </span>
                    <span className="flex-1 text-sm">{step.label}</span>
                    <button onClick={() => removeStep(step.id)}>
                      <X className="size-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <Select onValueChange={addStep} value="">
              <SelectTrigger>
                <SelectValue placeholder="+ Add a step" />
              </SelectTrigger>
              <SelectContent>
                {stepOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    <div className="flex items-center gap-2">
                      <option.icon className="size-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name.trim() || steps.length === 0}
          >
            Create workflow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}