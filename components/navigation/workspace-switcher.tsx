"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

interface Workspace {
  id: string;
  name: string;
  plan: string;
}

const workspaces: Workspace[] = [
  { id: "1", name: "UBND TP. Hồ Chí Minh", plan: "Đang theo dõi" },
  { id: "2", name: "UBND TP. Thủ Đức", plan: "Đang theo dõi" },
  { id: "3", name: "Sở Nội vụ", plan: "Đang theo dõi" },
];

function WorkspaceAvatar({ name }: { name: string }) {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-semibold text-primary">
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

export function WorkspaceSwitcher() {
  const [activeId, setActiveId] = useState(workspaces[0].id);
  const active = workspaces.find((w) => w.id === activeId)!;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}
         className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-accent transition-colors">
          <WorkspaceAvatar name={active.name} />
          <span className="hidden sm:inline max-w-32 truncate">
            {active.name}
          </span>
          <ChevronsUpDown className="size-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-64 rounded-xl p-2">
        <DropdownMenuLabel className="px-2 text-xs font-normal text-muted-foreground">
          Đơn vị quản lý
        </DropdownMenuLabel>

        {workspaces.map((ws) => (
          <DropdownMenuItem
            key={ws.id}
            onClick={() => setActiveId(ws.id)}
            className="gap-2 h-10 rounded-lg"
          >
            <WorkspaceAvatar name={ws.name} />
            <div className="flex flex-1 flex-col leading-tight">
              <span className="truncate text-sm">{ws.name}</span>
              <span className="text-xs text-muted-foreground">{ws.plan}</span>
            </div>
            {ws.id === activeId && (
              <Check className="size-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="my-1.5" />

        <DropdownMenuItem className="gap-2 h-9 rounded-lg">
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-dashed">
            <Plus className="size-3.5" />
          </span>
          <span className="text-sm">Thêm đơn vị</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
