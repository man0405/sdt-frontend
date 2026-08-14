"use client";

import { MoreHorizontal, Pencil, Trash2, RefreshCw, FileStack } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { KnowledgeSourceBadge, type SourceType } from "./knowledge-source-badge";

export interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  sourceTypes: SourceType[];
  documentCount: number;
  sizeLabel: string;
  status: "ready" | "indexing" | "error";
  lastSynced: string;
}

interface KnowledgeBaseCardProps {
  base: KnowledgeBase;
  onOpen?: (id: string) => void;
  onEdit?: (id: string) => void;
  onResync?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const statusConfig = {
  ready: { label: "Ready", className: "text-emerald-600 bg-emerald-500/10" },
  indexing: { label: "Indexing...", className: "text-amber-600 bg-amber-500/10" },
  error: { label: "Error", className: "text-destructive bg-destructive/10" },
};

export function KnowledgeBaseCard({
  base,
  onOpen,
  onEdit,
  onResync,
  onDelete,
}: KnowledgeBaseCardProps) {
  const status = statusConfig[base.status];

  return (
    <Card
      className="rounded-xl group hover:border-foreground/20 transition-colors cursor-pointer"
      onClick={() => onOpen?.(base.id)}
    >
      <CardHeader className="flex flex-row items-start justify-between pb-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <FileStack className="size-5 text-primary" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{base.name}</p>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium mt-1 ${status.className}`}
            >
              <span className="size-1.5 rounded-full bg-current" />
              {status.label}
            </span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-44 rounded-xl p-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9"
              onClick={() => onEdit?.(base.id)}
            >
              <Pencil className="size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9"
              onClick={() => onResync?.(base.id)}
            >
              <RefreshCw className="size-4" />
              Re-sync
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9 text-destructive focus:text-destructive"
              onClick={() => onDelete?.(base.id)}
            >
              <Trash2 className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground line-clamp-2 min-h-8">
          {base.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {base.sourceTypes.map((type) => (
            <KnowledgeSourceBadge key={type} type={type} />
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t text-[11px] text-muted-foreground">
          <span>
            {base.documentCount} documents · {base.sizeLabel}
          </span>
          <span>Synced {base.lastSynced}</span>
        </div>
      </CardContent>
    </Card>
  );
}