"use client";

import {
  FileText,
  FolderOpen,
  Image as ImageIcon,
  Paperclip,
  Table,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AttachmentMenuProps {
  onUploadFiles: () => void;
  onUploadImages: () => void;
  onUploadSpreadsheet?: () => void;
  onKnowledgeBase?: () => void;
}

export function AttachmentMenu({
  onUploadFiles,
  onUploadImages,
  onUploadSpreadsheet,
  onKnowledgeBase,
}: AttachmentMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="h-9 w-9 rounded-full"
        >
          <Paperclip className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        side="top"
        className="w-60"
      >
        <DropdownMenuItem onClick={onUploadFiles}>
          <FileText className="mr-2 h-4 w-4" />
          Upload Document
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onUploadImages}>
          <ImageIcon className="mr-2 h-4 w-4" />
          Upload Images
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onUploadSpreadsheet}
        >
          <Table className="mr-2 h-4 w-4" />
          Upload CSV / Excel
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onKnowledgeBase}
        >
          <FolderOpen className="mr-2 h-4 w-4" />
          Add from Knowledge Base
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}