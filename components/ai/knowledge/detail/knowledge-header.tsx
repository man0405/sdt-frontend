"use client";

import { ArrowLeft, MoreHorizontal, RefreshCw, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface KnowledgeHeaderProps {
  title: string;
  description: string;
  status: "ready" | "indexing" | "error";
  onUpload?: () => void;
  onSync?: () => void;
}

export function KnowledgeHeader({
  title,
  description,
  status,
  onUpload,
  onSync,
}: KnowledgeHeaderProps) {
  const router = useRouter();

  const badgeVariant =
    status === "ready"
      ? "default"
      : status === "indexing"
      ? "secondary"
      : "destructive";

  return (
    <div className="space-y-5">
      <Button
        variant="ghost"
        size="sm"
        className="w-fit"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

            <Badge variant={badgeVariant}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>

          <p className="max-w-2xl text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>

          <Button variant="outline" onClick={onSync}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}