"use client";

import { FileText, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DocumentEmptyStateProps {
  onUpload?: () => void;
}

export default function DocumentEmptyState({
  onUpload,
}: DocumentEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <FileText className="size-8 text-muted-foreground" />
      </div>

      <h3 className="text-xl font-semibold">
        No documents found
      </h3>

      <p className="mt-2 max-w-md text-muted-foreground">
        Upload PDF, DOCX, Markdown, CSV or TXT files to build
        your AI knowledge base.
      </p>

      <Button
        className="mt-6"
        onClick={onUpload}
      >
        <Upload className="size-4" />
        Upload Documents
      </Button>
    </div>
  );
}