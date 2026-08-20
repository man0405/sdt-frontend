"use client";

import { MoreHorizontal, Pencil, Archive, Trash2, MessageSquare, Bot, FileText } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Project } from "./project";
import { ProjectMembers } from "./project-members";

interface ProjectCardProps {
  project: Project;
  onOpen?: (id: string) => void;
  onEdit?: (id: string) => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ProjectCard({
  project,
  onOpen,
  onEdit,
  onArchive,
  onDelete,
}: ProjectCardProps) {
  return (
    <Card
      className="rounded-xl group hover:border-foreground/20 transition-colors cursor-pointer"
      onClick={() => onOpen?.(project.id)}
    >
      <CardHeader className="flex flex-row items-start justify-between pb-3">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-white"
            style={{ backgroundColor: project.color }}
          >
            {project.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{project.name}</p>
            <p className="text-xs text-muted-foreground">
              Updated {project.updatedAt}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
              aria-label="Project actions"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-40 rounded-xl p-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9"
              onClick={() => onEdit?.(project.id)}
            >
              <Pencil className="size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9"
              onClick={() => onArchive?.(project.id)}
            >
              <Archive className="size-4" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9 text-destructive focus:text-destructive"
              onClick={() => onDelete?.(project.id)}
            >
              <Trash2 className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground line-clamp-2 min-h-8">
          {project.description}
        </p>

        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <MessageSquare className="size-3" />
            {project.chatCount}
          </span>
          <span className="flex items-center gap-1">
            <Bot className="size-3" />
            {project.agentCount}
          </span>
          <span className="flex items-center gap-1">
            <FileText className="size-3" />
            {project.fileCount}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <ProjectMembers members={project.members} />
        </div>
      </CardContent>
    </Card>
  );
}