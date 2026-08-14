"use client";

import { useState } from "react";
import { Eye, EyeOff, Copy, Check, MoreHorizontal, RefreshCw, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export interface ApiKey {
  id: string;
  name: string;
  maskedKey: string;
  createdAt: string;
  lastUsed: string | null;
  scope: "full" | "read-only";
}

interface ApiKeyRowProps {
  apiKey: ApiKey;
  onRegenerate?: (id: string) => void;
  onRevoke?: (id: string) => void;
  onRename?: (id: string) => void;
}

export function ApiKeyRow({ apiKey, onRegenerate, onRevoke, onRename }: ApiKeyRowProps) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey.maskedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3.5 hover:bg-accent/50 transition-colors group">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium truncate">{apiKey.name}</p>
          <Badge variant="secondary" className="text-[10px]">
            {apiKey.scope === "full" ? "Full access" : "Read-only"}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <code className="text-xs font-mono text-muted-foreground">
            {revealed ? apiKey.maskedKey : apiKey.maskedKey.replace(/./g, "•").slice(0, 24)}
          </code>
          <button
            onClick={() => setRevealed((r) => !r)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {revealed ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
          </button>
          <button
            onClick={handleCopy}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? (
              <Check className="size-3.5 text-emerald-600" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
        </div>
      </div>

      <div className="text-right shrink-0 hidden sm:block">
        <p className="text-xs text-muted-foreground">Created {apiKey.createdAt}</p>
        <p className="text-xs text-muted-foreground">
          {apiKey.lastUsed ? `Last used ${apiKey.lastUsed}` : "Never used"}
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 shrink-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44 rounded-xl p-1.5">
          <DropdownMenuItem
            className="gap-2 rounded-lg h-9"
            onClick={() => onRename?.(apiKey.id)}
          >
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2 rounded-lg h-9"
            onClick={() => onRegenerate?.(apiKey.id)}
          >
            <RefreshCw className="size-4" />
            Regenerate
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1" />
          <DropdownMenuItem
            className="gap-2 rounded-lg h-9 text-destructive focus:text-destructive"
            onClick={() => onRevoke?.(apiKey.id)}
          >
            <Trash2 className="size-4" />
            Revoke
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}