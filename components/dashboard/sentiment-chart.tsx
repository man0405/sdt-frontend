import { Bot } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import {
  type DashboardDistribution,
  sentimentLabels,
  type SentimentType,
} from "@/lib/feedback-api";

import { formatDashboardNumber } from "./format-number";

const sentimentColors: Record<SentimentType, string> = {
  POSITIVE: "#16a34a",
  NEUTRAL: "#f59e0b",
  NEGATIVE: "#ef4444",
};

interface SentimentChartProps {
  items: DashboardDistribution["sentiment"];
}

export function SentimentChart({ items }: SentimentChartProps) {
  const total = items.reduce((count, item) => count + item.count, 0);
  const data = items.map((item) => {
    const key = item.key as SentimentType;

    return {
      ...item,
      key,
      label: sentimentLabels[key],
      color: sentimentColors[key],
      percentage: total ? Math.round((item.count / total) * 100) : 0,
    };
  });

  return (
    <article className="rounded-[24px] border border-border/80 bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold">Cảm xúc người dân</h2>
          <p className="mt-1 text-sm text-muted-foreground">Phân tích tự động bởi AI</p>
        </div>
        <span className="rounded-lg bg-teal-50 p-2 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300">
          <Bot className="size-4" />
        </span>
      </div>
      <div className="relative mx-auto h-44 max-w-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="label"
              innerRadius={50}
              outerRadius={72}
              paddingAngle={4}
              stroke="none"
            >
              {data.map((item) => (
                <Cell key={item.key} fill={item.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [formatDashboardNumber(Number(value)), name]}
              contentStyle={{
                borderRadius: 12,
                borderColor: "var(--border)",
                backgroundColor: "var(--popover)",
                color: "var(--popover-foreground)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold">{formatDashboardNumber(total)}</span>
          <span className="text-xs text-muted-foreground">đã phân tích</span>
        </div>
      </div>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.key} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full" style={{ background: item.color }} />
              {item.label}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">{formatDashboardNumber(item.count)}</span>
              <span className="w-9 text-right font-semibold">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
