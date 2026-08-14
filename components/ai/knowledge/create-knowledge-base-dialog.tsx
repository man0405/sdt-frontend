"use client";

import { useState } from "react";
import { Plus, Upload, Globe, Database, Cloud } from "lucide-react";

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

const sourceOptions = [
  { id: "file", icon: Upload, label: "Upload files", description: "PDF, DOCX, TXT, CSV" },
  { id: "url", icon: Globe, label: "Website URL", description: "Crawl and index a site" },
  { id: "database", icon: Database, label: "Connect database", description: "Sync from SQL/NoSQL" },
  { id: "integration", icon: Cloud, label: "Integration", description: "Notion, Slack, Drive" },
] as const;

interface CreateKnowledgeBaseDialogProps {
  onCreate?: (data: { name: string; description: string; sourceType: string }) => void;
}

export function CreateKnowledgeBaseDialog({ onCreate }: CreateKnowledgeBaseDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sourceType, setSourceType] = useState<string>("file");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onCreate?.({ name, description, sourceType });
    setName("");
    setDescription("");
    setSourceType("file");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1.5">
          <Plus className="size-4" />
          New knowledge base
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle>Create a knowledge base</DialogTitle>
          <DialogDescription>
            Add a source of information your agents and chats can reference.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="kb-name">Name</Label>
            <Input
              id="kb-name"
              placeholder="e.g. Product documentation"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="kb-description">Description</Label>
            <Textarea
              id="kb-description"
              placeholder="What kind of information does this contain?"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label>Source type</Label>
            <div className="grid grid-cols-2 gap-2">
              {sourceOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSourceType(option.id)}
                  className={`flex flex-col items-start gap-1.5 rounded-lg border p-3 text-left transition-colors ${
                    sourceType === option.id
                      ? "border-primary bg-primary/5"
                      : "hover:bg-accent/50"
                  }`}
                >
                  <option.icon className="size-4" />
                  <div>
                    <p className="text-xs font-medium">{option.label}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            Create & continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}