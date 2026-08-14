"use client";

import {
  FileText,
  FileSpreadsheet,
  FileCode,
  FileArchive,
  Image as ImageIcon,
} from "lucide-react";

import { ChatAttachment } from "../types";
import { cn } from "@/lib/utils";

interface MessageAttachmentsProps {
  attachments: ChatAttachment[];
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(type: string) {
  if (type.startsWith("image/")) return ImageIcon;

  if (type.includes("pdf")) return FileText;

  if (
    type.includes("csv") ||
    type.includes("excel") ||
    type.includes("spreadsheet")
  ) {
    return FileSpreadsheet;
  }

  if (
    type.includes("json") ||
    type.includes("javascript") ||
    type.includes("typescript")
  ) {
    return FileCode;
  }

  if (
    type.includes("zip") ||
    type.includes("rar")
  ) {
    return FileArchive;
  }

  return FileText;
}

export function MessageAttachments({
  attachments,
}: MessageAttachmentsProps) {
  if (!attachments.length) return null;

  return (
    <div className="mb-3 flex flex-wrap gap-3">
      {attachments.map((attachment) => {
        const Icon = getFileIcon(attachment.type);

        const isImage =
          attachment.type.startsWith("image/");

        return (
          <div
            key={attachment.id}
            className={cn(
              "overflow-hidden rounded-xl border bg-background shadow-sm",
              isImage ? "w-48" : "min-w-[220px]"
            )}
          >
            {isImage && attachment.url ? (
              <img
                src={attachment.url}
                alt={attachment.name}
                className="h-36 w-full object-cover"
              />
            ) : (
              <div className="flex items-center gap-3 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {attachment.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(attachment.size)}
                  </p>
                </div>
              </div>
            )}

            {isImage && (
              <div className="border-t p-2">
                <p className="truncate text-sm font-medium">
                  {attachment.name}
                </p>

                <p className="text-xs text-muted-foreground">
                  {formatFileSize(attachment.size)}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}