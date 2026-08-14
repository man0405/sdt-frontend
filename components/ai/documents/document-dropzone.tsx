"use client";

import { UploadCloud } from "lucide-react";

export default function DocumentDropzone() {
  return (
    <div className="flex h-72 flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors hover:border-primary">
      <UploadCloud className="mb-4 size-12 text-muted-foreground" />

      <h3 className="font-semibold">
        Drag & Drop Documents
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">
        PDF, DOCX, TXT, Markdown, CSV, XLSX
      </p>
    </div>
  );
}