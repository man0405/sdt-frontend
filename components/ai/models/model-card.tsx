"use client";

import { Eye, Wrench, Zap, Brain, Check } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { ModelBadge } from "./model-badge";

export interface Model {
  id: string;
  name: string;
  description: string;
  contextWindow: string;
  inputPrice: string;
  outputPrice: string;
  speed: "fast" | "balanced" | "powerful";
  capabilities: Array<"vision" | "tools" | "thinking">;
}

const capabilityConfig = {
  vision: { icon: Eye, label: "Vision" },
  tools: { icon: Wrench, label: "Tools" },
  thinking: { icon: Brain, label: "Extended thinking" },
};

const speedConfig = {
  fast: { label: "Fastest", className: "text-emerald-600 bg-emerald-500/10" },
  balanced: { label: "Balanced", className: "text-blue-600 bg-blue-500/10" },
  powerful: { label: "Most powerful", className: "text-purple-600 bg-purple-500/10" },
};

interface ModelCardProps {
  model: Model;
  isDefault?: boolean;
  onSetDefault?: (id: string) => void;
}

export function ModelCard({ model, isDefault, onSetDefault }: ModelCardProps) {
  const speed = speedConfig[model.speed];

  return (
    <Card
      className={`rounded-xl transition-colors cursor-pointer ${
        isDefault ? "border-primary ring-1 ring-primary" : "hover:border-foreground/20"
      }`}
      onClick={() => onSetDefault?.(model.id)}
    >
      <CardContent className="pt-5 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">{model.name}</p>
              {isDefault && (
                <span className="flex items-center gap-1 text-[11px] font-medium text-primary">
                  <Check className="size-3" />
                  Default
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {model.description}
            </p>
          </div>

          <span
            className={`shrink-0 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${speed.className}`}
          >
            <Zap className="size-3" />
            {speed.label}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {model.capabilities.map((cap) => {
            const config = capabilityConfig[cap];
            return <ModelBadge key={cap} icon={config.icon} label={config.label} />;
          })}
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t text-center">
          <div>
            <p className="text-xs font-medium">{model.contextWindow}</p>
            <p className="text-[10px] text-muted-foreground">Context</p>
          </div>
          <div>
            <p className="text-xs font-medium">{model.inputPrice}</p>
            <p className="text-[10px] text-muted-foreground">Input /1M</p>
          </div>
          <div>
            <p className="text-xs font-medium">{model.outputPrice}</p>
            <p className="text-[10px] text-muted-foreground">Output /1M</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}