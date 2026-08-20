import { type ReactNode } from "react";
import { CircleAlert, MessageCircle, Sparkles } from "lucide-react";

import type { DashboardStats } from "@/lib/feedback-api";
import { cn } from "@/lib/utils";

import { formatDashboardNumber } from "./format-number";

interface DashboardMetricsProps {
  stats: DashboardStats;
}

interface MetricCardProps {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
  positive?: boolean;
  warning?: boolean;
}

export function DashboardMetrics({ stats }: DashboardMetricsProps) {
  const priorityCount = stats.priority.high + stats.priority.urgent;
  const analyzedTotal = stats.sentiment.positive + stats.sentiment.neutral + stats.sentiment.negative;
  const satisfaction = analyzedTotal
    ? `${((stats.sentiment.positive / analyzedTotal) * 100).toLocaleString("vi-VN", { maximumFractionDigits: 1 })}%`
    : "—";

  return (
    <section className="grid gap-4 sm:grid-cols-1 xl:grid-cols-3">
      <MetricCard
        label="Tổng phản hồi"
        value={formatDashboardNumber(stats.totalFeedback)}
        icon={<MessageCircle className="size-5" />}
        detail="toàn bộ dữ liệu"
      />
      <MetricCard
        label="Cần ưu tiên xử lý"
        value={formatDashboardNumber(priorityCount)}
        icon={<CircleAlert className="size-5" />}
        detail="mức cao và khẩn cấp"
        warning
      />
      <MetricCard
        label="Tỷ lệ hài lòng"
        value={satisfaction}
        icon={<Sparkles className="size-5" />}
        detail="trên phản hồi đã phân tích"
        positive
      />
    </section>
  );
}

function MetricCard({ label, value, detail, icon, positive, warning }: MetricCardProps) {
  return (
    <article className="rounded-[22px] border border-border/80 bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span
          className={cn(
            "rounded-xl p-2.5",
            warning
              ? "bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-300"
              : positive
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                : "bg-teal-50 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300"
          )}
        >
          {icon}
        </span>
      </div>
      <p className="mt-5 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-2 text-xs text-muted-foreground">{detail}</p>
    </article>
  );
}
