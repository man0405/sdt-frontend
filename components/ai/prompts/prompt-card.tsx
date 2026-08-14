"use client";

import { MoreHorizontal, Pencil, Copy, Trash2, Star, Play } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PromptCategoryBadge, type PromptCategory } from "./prompt-category-badge";

export interface Prompt {
  id: string;
  title: string;
  template: string;
  category: PromptCategory;
  favorite: boolean;
  usageCount: number;
}

interface PromptCardProps {
  prompt: Prompt;
  onUse?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

export function PromptCard({
  prompt,
  onUse,
  onEdit,
  onDuplicate,
  onDelete,
  onToggleFavorite,
}: PromptCardProps) {
  return (
    <Card className="rounded-xl group hover:border-foreground/20 transition-colors">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center gap-2 min-w-0">
          <PromptCategoryBadge category={prompt.category} />
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={() => onToggleFavorite?.(prompt.id)}
          >
            <Star
              className={`size-4 ${
                prompt.favorite ? "fill-amber-400 text-amber-400" : ""
              }`}
            />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-xl p-1.5">
              <DropdownMenuItem
                className="gap-2 rounded-lg h-9"
                onClick={() => onEdit?.(prompt.id)}
              >
                <Pencil className="size-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 rounded-lg h-9"
                onClick={() => onDuplicate?.(prompt.id)}
              >
                <Copy className="size-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem
                className="gap-2 rounded-lg h-9 text-destructive focus:text-destructive"
                onClick={() => onDelete?.(prompt.id)}
              >
                <Trash2 className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-semibold mb-1">{prompt.title}</p>
          <p className="text-xs text-muted-foreground line-clamp-2 font-mono">
            {prompt.template}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-muted-foreground">
            Used {prompt.usageCount} times
          </span>

          <Button
            size="sm"
            variant="secondary"
            className="h-7 gap-1.5 text-xs"
            onClick={() => onUse?.(prompt.id)}
          >
            <Play className="size-3 fill-current" />
            Use
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}