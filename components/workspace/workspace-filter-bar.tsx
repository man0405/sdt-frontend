"use client";

import { Search, LayoutGrid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { ProjectView } from "./project";

interface WorkspaceFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  view: ProjectView;
  onViewChange: (view: ProjectView) => void;
}

export function WorkspaceFilterBar({
  search,
  onSearchChange,
  view,
  onViewChange,
}: WorkspaceFilterBarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          className="pl-9"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex items-center rounded-lg border p-0.5">
        <Button
          variant={view === "grid" ? "secondary" : "ghost"}
          size="icon"
          className="size-7"
          aria-label="Grid view"
          onClick={() => onViewChange("grid")}
        >
          <LayoutGrid className="size-4" />
        </Button>
        <Button
          variant={view === "list" ? "secondary" : "ghost"}
          size="icon"
          className="size-7"
          aria-label="List view"
          onClick={() => onViewChange("list")}
        >
          <List className="size-4" />
        </Button>
      </div>
    </div>
  );
}