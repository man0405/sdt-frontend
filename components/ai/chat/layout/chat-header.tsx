"use client";

import {
  Archive,
  Copy,
  FileText,
  Link,
  MoreHorizontal,
  Pencil,
  Pin,
  Settings,
  Share2,
  Star,
  Trash2,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChatHeaderProps {
  model: string;
  onModelChange: (model: string) => void;
}

export function ChatHeader({
  model,
  onModelChange,
}: ChatHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold">
          New Chat
        </h2>

        <Select value={model} onValueChange={onModelChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="claude-sonnet-4">
              Claude Sonnet 4
            </SelectItem>

            <SelectItem value="gpt-4o">
              GPT-4o
            </SelectItem>

            <SelectItem value="gemini-2.5-pro">
              Gemini 2.5 Pro
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        {/* Share Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Link className="mr-2 h-4 w-4" />
              Copy Link
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              Share Conversation
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate Conversation
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Export as Markdown
            </DropdownMenuItem>

            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Export as PDF
            </DropdownMenuItem>

            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Export as JSON
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* More Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Rename Conversation
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Pin className="mr-2 h-4 w-4" />
              Pin Conversation
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Star className="mr-2 h-4 w-4" />
              Add to Favorites
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              Archive Conversation
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Chat Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Conversation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}