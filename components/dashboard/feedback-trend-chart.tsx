import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { DashboardTrend } from "@/lib/feedback-api";

import { formatDashboardNumber } from "./format-number";

interface FeedbackTrendChartProps {
  points: DashboardTrend["points"];
}

export function FeedbackTrendChart({ points }: FeedbackTrendChartProps) {
  const data = points.map((point) => ({
    day: new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit" }).format(
      new Date(`${point.period}T00:00:00`)
    ),
    value: point.count,
  }));

  return (
    <article className="rounded-[24px] border border-border/80 bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-base font-semibold">Xu hướng tiếp nhận phản hồi</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Số lượng phản hồi theo ngày trong 7 ngày qua
        </p>
      </div>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="feedbackTrend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0f766e" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#0f766e" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            />
            <Tooltip
              cursor={{ stroke: "#5eead4", strokeWidth: 2 }}
              contentStyle={{
                borderRadius: 14,
                borderColor: "var(--border)",
                backgroundColor: "var(--popover)",
                color: "var(--popover-foreground)",
                boxShadow: "0 8px 24px rgba(15, 23, 42, .16)",
              }}
              formatter={(value) => [formatDashboardNumber(Number(value)), "Phản hồi"]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0f766e"
              strokeWidth={3}
              fill="url(#feedbackTrend)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
