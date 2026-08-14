"use client";

import { useState } from "react";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";

const emojiOptions = ["🤖", "🧠", "✨", "📊", "💬", "🔍", "📝", "🎨"];

const tools = [
  { id: "web_search", label: "Web Search", description: "Search the internet for current info" },
  { id: "code_execution", label: "Code Execution", description: "Run and test code snippets" },
  { id: "file_access", label: "File Access", description: "Read and analyze uploaded files" },
];

interface CreateAgentDialogProps {
  onCreate?: (agent: {
    name: string;
    description: string;
    icon: string;
    model: string;
    instructions: string;
    enabledTools: string[];
  }) => void;
}

export function CreateAgentDialog({ onCreate }: CreateAgentDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("🤖");
  const [model, setModel] = useState("sonnet-5");
  const [instructions, setInstructions] = useState("");
  const [enabledTools, setEnabledTools] = useState<string[]>([]);

  const toggleTool = (id: string) => {
    setEnabledTools((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (!name.trim()) return;

    onCreate?.({ name, description, icon, model, instructions, enabledTools });

    // reset
    setName("");
    setDescription("");
    setIcon("🤖");
    setInstructions("");
    setEnabledTools([]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1.5">
          <Plus className="size-4" />
          Create agent
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a new agent</DialogTitle>
          <DialogDescription>
            Configure a specialized AI agent with its own instructions and tools.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex gap-3">
            <div className="space-y-2">
              <Label>Icon</Label>
              <div className="grid grid-cols-4 gap-1.5">
                {emojiOptions.map((e) => (
                  <button
                    key={e}
                    onClick={() => setIcon(e)}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg border transition-colors ${
                      icon === e
                        ? "border-primary bg-primary/10"
                        : "border-transparent hover:bg-accent"
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <Label htmlFor="agent-name">Name</Label>
              <Input
                id="agent-name"
                placeholder="e.g. Customer Support Bot"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="agent-description">Description</Label>
            <Input
              id="agent-description"
              placeholder="What does this agent do?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Model</Label>
            <Select value={model} onValueChange={setModel}>
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

          <div className="space-y-2">
            <Label htmlFor="agent-instructions">System instructions</Label>
            <Textarea
              id="agent-instructions"
              placeholder="You are a helpful assistant that..."
              rows={4}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label>Tools</Label>
            <div className="space-y-1">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className="flex items-center justify-between rounded-lg border px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{tool.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>
                  <Switch
                    checked={enabledTools.includes(tool.id)}
                    onCheckedChange={() => toggleTool(tool.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            Create agent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}