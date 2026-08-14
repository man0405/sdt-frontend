"use client";
import Link from "next/link";
import { useState } from "react";
import {
  SlidersHorizontal,
  MoreHorizontal,
  Star,
  Pencil,
  FolderPlus,
  Trash2,
  Check,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const recents = [
  { title: "Collapsible sidebar navigation component" },
  { title: "AI SaaS starter kit planning" },
  { title: "Web template pricing structure" },
  { title: "Untitled" },
  { title: "Scaling an AI SaaS product" },
  { title: "Next.js website links broken in nav" },
  { title: "Subtle background colors for menu" },
  { title: "Migrating to react-icons library" },
  { title: "Card design enhancement with shadows" },
];

const sortOptions = [
  { value: "activity", label: "Recent activity" },
  { value: "created", label: "Date created" },
  { value: "alphabetical", label: "Alphabetical" },
] as const;

export function NavRecents() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("activity");
  const [starredOnly, setStarredOnly] = useState(false);

  return (
    <SidebarGroup className="px-2 group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex items-center justify-between px-2">
        <span>Recents</span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-accent transition-colors">
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="bottom" align="end" className="w-48">
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
              Sort by
            </DropdownMenuLabel>

            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => setSortBy(option.value)}
              >
                <span className="flex-1">{option.label}</span>
                {sortBy === option.value && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => setStarredOnly((prev) => !prev)}>
              <Star className="mr-2 h-4 w-4" />
              <span className="flex-1">Starred only</span>
              {starredOnly && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarGroupLabel>

      <SidebarGroupContent>
  <SidebarMenu>
    {recents.map((chat, index) => (
      <SidebarMenuItem key={index}>
        <SidebarMenuButton
          asChild
          className={`h-8 rounded-sm ${
            chat.title === "Untitled" ? "text-muted-foreground" : ""
          }`}
        >
          <Link href="/ai/conversations">
            <span className="truncate">{chat.title}</span>
          </Link>
        </SidebarMenuButton>

        <DropdownMenu
          open={openMenuId === String(index)}
          onOpenChange={(open) =>
            setOpenMenuId(open ? String(index) : null)
          }
        >
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction
              showOnHover
              className="data-[state=open]:bg-accent data-[state=open]:opacity-100"
            >
              <MoreHorizontal />
            </SidebarMenuAction>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="right" align="start" className="w-48">
            <DropdownMenuItem>
              <Star className="mr-2 h-4 w-4" />
              Star
              <DropdownMenuShortcut>P</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Rename
              <DropdownMenuShortcut>R</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <FolderPlus className="mr-2 h-4 w-4" />
                Add to project
              </DropdownMenuSubTrigger>
            </DropdownMenuSub>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
              <DropdownMenuShortcut>D</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    ))}
  </SidebarMenu>
</SidebarGroupContent>
    </SidebarGroup>
  );
}