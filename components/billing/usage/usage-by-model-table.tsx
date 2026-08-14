interface ModelUsage {
  model: string;
  requests: number;
  inputTokens: string;
  outputTokens: string;
  cost: string;
}

const modelUsage: ModelUsage[] = [
  { model: "Claude Sonnet 5", requests: 1240, inputTokens: "2.1M", outputTokens: "890K", cost: "$18.40" },
  { model: "Claude Opus 4.8", requests: 180, inputTokens: "640K", outputTokens: "210K", cost: "$22.10" },
  { model: "Claude Haiku 4.5", requests: 3420, inputTokens: "4.8M", outputTokens: "1.2M", cost: "$8.90" },
];

export function UsageByModelTable() {
  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-4 px-4 py-2.5 bg-muted/50 text-xs font-medium text-muted-foreground">
        <span>Model</span>
        <span>Requests</span>
        <span>Input tokens</span>
        <span>Output tokens</span>
        <span className="text-right">Cost</span>
      </div>

      <div className="divide-y">
        {modelUsage.map((row) => (
          <div
            key={row.model}
            className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-4 items-center px-4 py-3 text-sm"
          >
            <span className="font-medium">{row.model}</span>
            <span className="text-muted-foreground">{row.requests.toLocaleString()}</span>
            <span className="text-muted-foreground">{row.inputTokens}</span>
            <span className="text-muted-foreground">{row.outputTokens}</span>
            <span className="text-right font-medium">{row.cost}</span>
          </div>
        ))}
      </div>
    </div>
  );
}