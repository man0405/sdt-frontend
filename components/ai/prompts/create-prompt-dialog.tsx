"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

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

import type { PromptCategory } from "./prompt-category-badge";

interface CreatePromptDialogProps {
  onCreate?: (data: {
    title: string;
    template: string;
    category: PromptCategory;
  }) => void;
}

export function CreatePromptDialog({ onCreate }: CreatePromptDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [template, setTemplate] = useState("");
  const [category, setCategory] = useState<PromptCategory>("writing");

  const handleSubmit = () => {
    if (!title.trim() || !template.trim()) return;

    onCreate?.({ title, template, category });

    setTitle("");
    setTemplate("");
    setCategory("writing");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1.5">
          <Plus className="size-4" />
          New prompt
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle>Create a prompt template</DialogTitle>
          <DialogDescription>
            Use{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              {"{{variable}}"}
            </code>{" "}
            syntax for parts you want to fill in each time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="prompt-title">Title</Label>
            <Input
              id="prompt-title"
              placeholder="e.g. Blog post outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as PromptCategory)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="writing">Writing</SelectItem>
                <SelectItem value="coding">Coding</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="productivity">Productivity</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt-template">Prompt template</Label>
            <Textarea
              id="prompt-template"
              placeholder="Write a {{tone}} blog post outline about {{topic}}..."
              rows={5}
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="resize-none font-mono text-sm"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim() || !template.trim()}>
            Create prompt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}