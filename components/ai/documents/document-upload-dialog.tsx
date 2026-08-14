"use client";

import { Upload } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function DocumentUploadDialog() {
  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button>
          <Upload className="size-4" />
          Upload Documents
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">

        <DialogHeader>

          <DialogTitle>
            Upload Documents
          </DialogTitle>

          <DialogDescription>
            Upload documents for AI retrieval and knowledge.
          </DialogDescription>

        </DialogHeader>

        <div className="flex h-72 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed">
          <Upload className="mb-4 size-10 text-muted-foreground" />

          <p className="font-medium">
            Drag & drop files here
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            or click to browse
          </p>
        </div>

      </DialogContent>

    </Dialog>
  );
}