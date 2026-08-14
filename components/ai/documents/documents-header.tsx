"use client";

import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DocumentsHeader() {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Documents
        </h1>

        <p className="mt-0 text-muted-foreground">
          Manage documents used by AI assistants, knowledge bases and RAG
          applications.
        </p>
      </div>

      <Button size="lg">
        <Upload className="size-5" />
        Upload Documents
      </Button>
    </div>
  );
}