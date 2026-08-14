"use client";

import { CheckCircle2 } from "lucide-react";

import { ModelCard, type Model } from "./model-card";
import { ConnectProviderDialog } from "./connect-provider-dialog";

interface ProviderSectionProps {
  providerName: string;
  providerLogo?: string;
  connected: boolean;
  models: Model[];
  defaultModelId: string;
  onSetDefault: (id: string) => void;
  onConnect: (apiKey: string) => void;
}

export function ProviderSection({
  providerName,
  connected,
  models,
  defaultModelId,
  onSetDefault,
  onConnect,
}: ProviderSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">{providerName}</h3>
          {connected && (
            <span className="flex items-center gap-1 text-[11px] text-emerald-600">
              <CheckCircle2 className="size-3.5" />
              Connected
            </span>
          )}
        </div>

        {!connected && (
          <ConnectProviderDialog providerName={providerName} onConnect={onConnect} />
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {models.map((model) => (
          <ModelCard
            key={model.id}
            model={model}
            isDefault={model.id === defaultModelId}
            onSetDefault={connected ? onSetDefault : undefined}
          />
        ))}
      </div>

      {!connected && (
        <p className="text-xs text-muted-foreground">
          Connect your {providerName} API key to enable these models.
        </p>
      )}
    </div>
  );
}