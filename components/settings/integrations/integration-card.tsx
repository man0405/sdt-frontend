"use client";

import { CheckCircle2, MoreHorizontal, Settings2, Unlink } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Integration {
  id: string;
  name: string;
  description: string;
  logoLetter: string;
  logoColor: string;
  connected: boolean;
  connectedAccount?: string;
}

interface IntegrationCardProps {
  integration: Integration;
  onConnect?: (id: string) => void;
  onDisconnect?: (id: string) => void;
  onConfigure?: (id: string) => void;
}

export function IntegrationCard({
  integration,
  onConnect,
  onDisconnect,
  onConfigure,
}: IntegrationCardProps) {
  return (
    <Card className="rounded-xl">
      <CardContent className="flex items-center gap-4 pt-5">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: integration.logoColor }}
        >
          {integration.logoLetter}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold truncate">{integration.name}</p>
            {integration.connected && (
              <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {integration.connected && integration.connectedAccount
              ? `Connected as ${integration.connectedAccount}`
              : integration.description}
          </p>
        </div>

        {integration.connected ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8 shrink-0">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 rounded-xl p-1.5">
              <DropdownMenuItem
                className="gap-2 rounded-lg h-9"
                onClick={() => onConfigure?.(integration.id)}
              >
                <Settings2 className="size-4" />
                Configure
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem
                className="gap-2 rounded-lg h-9 text-destructive focus:text-destructive"
                onClick={() => onDisconnect?.(integration.id)}
              >
                <Unlink className="size-4" />
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="shrink-0"
            onClick={() => onConnect?.(integration.id)}
          >
            Connect
          </Button>
        )}
      </CardContent>
    </Card>
  );
}