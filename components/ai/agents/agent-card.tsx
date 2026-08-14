"use client";

import { MoreHorizontal, Pencil, Copy, Trash2, Play } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AgentStatus, type AgentStatus as AgentStatusType } from "./agent-status";
import { AgentMetrics } from "./agent-metrics";

export interface Agent {
  id: string;
  name: string;
  description: string;
  icon: string;
  model: string;
  status: AgentStatusType;
  usageCount: number;
}

interface AgentCardProps {
  agent: Agent;
  onEdit?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRun?: (id: string) => void;
}

export function AgentCard({
  agent,
  onEdit,
  onDuplicate,
  onDelete,
  onRun,
}: AgentCardProps) {
  return (
    <Card className="rounded-xl group hover:border-foreground/20 transition-colors">
      <CardHeader className="flex flex-row items-start justify-between pb-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl">
            {agent.icon}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{agent.name}</p>
            <div className="mt-1">
              <AgentStatus status={agent.status} />
            </div>
          </div>
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
          <DropdownMenuContent align="end" className="w-40 rounded-xl p-1.5">
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9"
              onClick={() => onEdit?.(agent.id)}
            >
              <Pencil className="size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9"
              onClick={() => onDuplicate?.(agent.id)}
            >
              <Copy className="size-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9 text-destructive focus:text-destructive"
              onClick={() => onDelete?.(agent.id)}
            >
              <Trash2 className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground line-clamp-2 min-h-8">
          {agent.description}
        </p>

        <div className="flex items-center justify-between pt-1">
          <AgentMetrics model={agent.model} usageCount={agent.usageCount} />

          <Button
            size="sm"
            variant="secondary"
            className="h-7 gap-1.5 text-xs"
            onClick={() => onRun?.(agent.id)}
          >
            <Play className="size-3 fill-current" />
            Run
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}