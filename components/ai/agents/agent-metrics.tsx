interface AgentMetricsProps {
  model: string;
  usageCount: number;
}

export function AgentMetrics({ model, usageCount }: AgentMetricsProps) {
  return (
    <span className="text-[11px] text-muted-foreground">
      {model} · {usageCount.toLocaleString()} runs
    </span>
  );
}