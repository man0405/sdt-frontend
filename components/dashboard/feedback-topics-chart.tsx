import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { DashboardDistribution } from "@/lib/feedback-api";

import { formatDashboardNumber } from "./format-number";

const topicColors = ["#0f766e", "#14b8a6", "#5eead4", "#99f6e4", "#ccfbf1"];

interface FeedbackTopicsChartProps {
  items: DashboardDistribution["category"];
}

export function FeedbackTopicsChart({ items }: FeedbackTopicsChartProps) {
  const data = items.slice(0, 5).map((item, index) => ({
    topic: item.label || "Chưa phân loại",
    value: item.count,
    color: topicColors[index],
  }));

  return (
    <article className="rounded-[24px] border border-border/80 bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold">Chủ đề được nhắc đến</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Top nhóm vấn đề trong toàn bộ dữ liệu
        </p>
      </div>
      {data.length ? (
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 0, right: 12 }} barSize={14}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="topic"
                width={122}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              />
              <Tooltip
                cursor={{ fill: "var(--muted)" }}
                contentStyle={{
                  borderRadius: 12,
                  borderColor: "var(--border)",
                  backgroundColor: "var(--popover)",
                  color: "var(--popover-foreground)",
                }}
                formatter={(value) => [formatDashboardNumber(Number(value)), "Phản hồi"]}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {data.map((item) => (
                  <Cell key={item.topic} fill={item.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="py-20 text-center text-sm text-muted-foreground">Chưa có dữ liệu chủ đề.</p>
      )}
    </article>
  );
}
