"use client";

import { useRouter } from "next/navigation";
import {
  Plus,
  MessageSquare,
  Image as ImageIcon,
  FileText,
  Folder,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NewButton() {
  const router = useRouter();

  return (
    <div className="hidden sm:flex items-center rounded-md shadow-xs">
      <Button
        onClick={() => router.push("/ai/chat/")}
        className="rounded-r-none gap-1.5 pr-3"
      >
        <Plus className="size-4" />
        New chat
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-l-none border-l border-primary-foreground/20 px-2"
          >
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-52 rounded-xl p-1.5">
          <DropdownMenuItem
            onClick={() => router.push("/ai/chat/new")}
            className="gap-2 h-9 rounded-lg"
          >
            <MessageSquare className="size-4" />
            New chat
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/ai/image/new")}
            className="gap-2 h-9 rounded-lg"
          >
            <ImageIcon className="size-4" />
            New image
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/ai/documents/new")}
            className="gap-2 h-9 rounded-lg"
          >
            <FileText className="size-4" />
            New document
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem
            onClick={() => router.push("/workspace/new")}
            className="gap-2 h-9 rounded-lg"
          >
            <Folder className="size-4" />
            New workspace
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}