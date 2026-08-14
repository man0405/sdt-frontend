"use client";

import { MoreHorizontal, Pencil, Copy, Trash2, Play, Pause, Zap } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { WorkflowStatusBadge, type WorkflowStatus } from "./workflow-status";
import { WorkflowStepsPreview, type WorkflowStep } from "./workflow-steps-preview";

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  trigger: string;
  steps: WorkflowStep[];
  runCount: number;
  lastRun?: string;
}

interface WorkflowCardProps {
  workflow: Workflow;
  onEdit?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleStatus?: (id: string) => void;
  onRun?: (id: string) => void;
}

export function WorkflowCard({
  workflow,
  onEdit,
  onDuplicate,
  onDelete,
  onToggleStatus,
  onRun,
}: WorkflowCardProps) {
  return (
    <Card className="rounded-xl group hover:border-foreground/20 transition-colors">
      <CardHeader className="flex flex-row items-start justify-between pb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-sm font-semibold truncate">{workflow.name}</p>
            <WorkflowStatusBadge status={workflow.status} />
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {workflow.description}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 rounded-xl p-1.5">
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9"
              onClick={() => onEdit?.(workflow.id)}
            >
              <Pencil className="size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9"
              onClick={() => onToggleStatus?.(workflow.id)}
            >
              {workflow.status === "active" ? (
                <>
                  <Pause className="size-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="size-4" />
                  Activate
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9"
              onClick={() => onDuplicate?.(workflow.id)}
            >
              <Copy className="size-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9 text-destructive focus:text-destructive"
              onClick={() => onDelete?.(workflow.id)}
            >
              <Trash2 className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="space-y-3">
        <WorkflowStepsPreview steps={workflow.steps} />

        <div className="flex items-center justify-between pt-1 border-t">
          <div className="flex items-center gap-3 pt-3">
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Zap className="size-3" />
              {workflow.trigger}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {workflow.runCount} runs
            </span>
          </div>

          <Button
            size="sm"
            variant="secondary"
            className="h-7 gap-1.5 text-xs mt-3"
            onClick={() => onRun?.(workflow.id)}
          >
            <Play className="size-3 fill-current" />
            Run
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}