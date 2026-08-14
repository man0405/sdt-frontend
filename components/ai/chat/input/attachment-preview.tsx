"use client";

import {
  FileText,
  FileSpreadsheet,
  FileArchive,
  FileCode,
  Image as ImageIcon,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ChatAttachment } from "./use-chat-input";

interface AttachmentPreviewProps {
  attachments: ChatAttachment[];
  onRemove: (id: string) => void;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(type: string) {
  if (type.startsWith("image/")) {
    return ImageIcon;
  }

  if (type.includes("pdf")) {
    return FileText;
  }

  if (
    type.includes("csv") ||
    type.includes("excel") ||
    type.includes("spreadsheet")
  ) {
    return FileSpreadsheet;
  }

  if (
    type.includes("zip") ||
    type.includes("rar")
  ) {
    return FileArchive;
  }

  if (
    type.includes("json") ||
    type.includes("javascript") ||
    type.includes("typescript")
  ) {
    return FileCode;
  }

  return FileText;
}

export function AttachmentPreview({
  attachments,
  onRemove,
}: AttachmentPreviewProps) {
  if (!attachments.length) return null;

  return (
    <div className="flex flex-wrap gap-3 border-b px-4 py-3">
      {attachments.map((attachment) => {
        const Icon = getFileIcon(
          attachment.file.type
        );

        const isImage =
          attachment.file.type.startsWith("image/");

        return (
          <div
            key={attachment.id}
            className="group relative flex items-center gap-3 rounded-xl border bg-muted/40 p-2 transition-colors hover:bg-muted"
          >
            {isImage ? (
              <img
                src={attachment.preview}
                alt={attachment.file.name}
                className="h-12 w-12 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
            )}

            <div className="min-w-0">
              <p className="max-w-[170px] truncate text-sm font-medium">
                {attachment.file.name}
              </p>

              <p className="text-xs text-muted-foreground">
                {formatFileSize(
                  attachment.file.size
                )}
              </p>
            </div>

            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "h-7 w-7 rounded-full",
                "opacity-0 transition-opacity",
                "group-hover:opacity-100"
              )}
              onClick={() =>
                onRemove(attachment.id)
              }
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}