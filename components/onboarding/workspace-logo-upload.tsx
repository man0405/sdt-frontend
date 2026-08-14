"use client";

import { useRef } from "react";
import { ImagePlus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface WorkspaceLogoUploadProps {
  value?: string | null;
  onChange: (file: File | null) => void;
}

export function WorkspaceLogoUpload({
  value,
  onChange,
}: WorkspaceLogoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSelect(file: File | null) {
    if (!file) return;

    onChange(file);
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">
        Workspace Logo
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        className="group cursor-pointer rounded-xl border-2 border-dashed p-6 transition-colors hover:border-primary"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          hidden
          onChange={(e) =>
            handleSelect(e.target.files?.[0] ?? null)
          }
        />

        {value ? (
          <div className="flex flex-col items-center gap-4">
            <img
              src={value}
              alt="Workspace Logo"
              className="h-20 w-20 rounded-xl border object-cover"
            />

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Logo
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-full bg-primary/10 p-4">
              <ImagePlus className="h-7 w-7 text-primary" />
            </div>

            <div className="text-center">
              <p className="font-medium">
                Upload workspace logo
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                PNG, JPG or WebP
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}