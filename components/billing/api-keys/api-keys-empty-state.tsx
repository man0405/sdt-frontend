import { KeyRound } from "lucide-react";
import { CreateApiKeyDialog } from "./create-api-key-dialog";

interface ApiKeysEmptyStateProps {
  onCreate?: (data: { name: string; scope: "full" | "read-only" }) => void;
}

export function ApiKeysEmptyState({ onCreate }: ApiKeysEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 px-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
        <KeyRound className="size-7 text-primary" />
      </span>

      <h3 className="text-lg font-semibold mb-1">No API keys yet</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        Create an API key to integrate Orbit into your own applications.
      </p>

      <CreateApiKeyDialog onCreate={onCreate} />
    </div>
  );
}