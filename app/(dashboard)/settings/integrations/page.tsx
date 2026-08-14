"use client";

import { useState } from "react";

import { IntegrationCard, type Integration } from "@/components/settings/integrations/integration-card";
import { IntegrationConnectDialog } from "@/components/settings/integrations/integration-connect-dialog";

const initialIntegrations: Integration[] = [
  {
    id: "slack",
    name: "Slack",
    description: "Send notifications and run workflows from Slack.",
    logoLetter: "S",
    logoColor: "#4A154B",
    connected: true,
    connectedAccount: "codervent.slack.com",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Sync documents into your knowledge bases.",
    logoLetter: "N",
    logoColor: "#000000",
    connected: false,
  },
  {
    id: "github",
    name: "GitHub",
    description: "Let agents read and comment on pull requests.",
    logoLetter: "G",
    logoColor: "#181717",
    connected: false,
  },
  {
    id: "google_drive",
    name: "Google Drive",
    description: "Import files directly into your projects.",
    logoLetter: "D",
    logoColor: "#4285F4",
    connected: true,
    connectedAccount: "virendra@codervent.com",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Trigger workflows from thousands of other apps.",
    logoLetter: "Z",
    logoColor: "#FF4A00",
    connected: false,
  },
];

export default function IntegrationsSettingsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  const [pendingConnect, setPendingConnect] = useState<Integration | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleConnectClick = (id: string) => {
    const integration = integrations.find((i) => i.id === id);
    if (!integration) return;
    setPendingConnect(integration);
    setDialogOpen(true);
  };

  const handleConfirmConnect = () => {
    if (!pendingConnect) return;
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === pendingConnect.id
          ? { ...i, connected: true, connectedAccount: "your-account" }
          : i
      )
    );
    setDialogOpen(false);
  };

  const handleDisconnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, connected: false, connectedAccount: undefined } : i
      )
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Integrations</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Connect Orbit with the tools you already use.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {integrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            onConnect={handleConnectClick}
            onDisconnect={handleDisconnect}
            onConfigure={(id) => console.log("configure", id)}
          />
        ))}
      </div>

      <IntegrationConnectDialog
        integrationName={pendingConnect?.name ?? null}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleConfirmConnect}
      />
    </div>
  );
}