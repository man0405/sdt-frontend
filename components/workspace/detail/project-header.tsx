"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Share2, MoreHorizontal, 
  Archive, Trash2, Link2, Shield, Globe, Mail, UserPlus, 
  Copy} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProjectMembers } from "@/components/workspace/project-members";
import type { ProjectMember } from "@/components/workspace/project";

interface ProjectHeaderProps {
  name: string;
  description: string;
  color: string;
  members: ProjectMember[];
  onEdit?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
}

export function ProjectHeader({
  name,
  description,
  color,
  members,
  onEdit,
  onArchive,
  onDelete,
}: ProjectHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={() => router.push("/workspace")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="size-4" />
        Back to Workspace
      </button>

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-semibold text-white"
            style={{ backgroundColor: color }}
          >
            {name.charAt(0)}
          </span>
          <div>
            <h1 className="text-2xl font-semibold">{name}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <ProjectMembers members={members} />

          <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <Share2 className="size-4" />
      Share
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent
    align="end"
    className="w-60 rounded-xl p-2"
  >
    <DropdownMenuItem className="h-9 gap-2 rounded-lg">
      <Copy className="size-4" />
      Copy project link
    </DropdownMenuItem>

    <DropdownMenuItem className="h-9 gap-2 rounded-lg">
      <UserPlus className="size-4" />
      Invite members
    </DropdownMenuItem>

    <DropdownMenuItem className="h-9 gap-2 rounded-lg">
      <Mail className="size-4" />
      Share via email
    </DropdownMenuItem>

    <DropdownMenuSeparator />

    <DropdownMenuItem className="h-9 gap-2 rounded-lg">
      <Globe className="size-4" />
      Make public
    </DropdownMenuItem>

    <DropdownMenuItem className="h-9 gap-2 rounded-lg">
      <Shield className="size-4" />
      Manage permissions
    </DropdownMenuItem>

    <DropdownMenuSeparator />

    <DropdownMenuItem className="h-9 gap-2 rounded-lg">
      <Link2 className="size-4" />
      Generate share link
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Project actions">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 rounded-xl p-1.5">
              <DropdownMenuItem className="gap-2 rounded-lg h-9" onClick={onEdit}>
                <Pencil className="size-4" />
                Edit project
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 rounded-lg h-9" onClick={onArchive}>
                <Archive className="size-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem
                className="gap-2 rounded-lg h-9 text-destructive focus:text-destructive"
                onClick={onDelete}
              >
                <Trash2 className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}