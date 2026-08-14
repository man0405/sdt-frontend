"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const data7d = [
  { date: "Jul 5", usage: 210 },
  { date: "Jul 6", usage: 180 },
  { date: "Jul 7", usage: 340 },
  { date: "Jul 8", usage: 290 },
  { date: "Jul 9", usage: 410 },
  { date: "Jul 10", usage: 380 },
  { date: "Jul 11", usage: 460 },
];

const data30d = [
  { date: "Week 1", usage: 1240 },
  { date: "Week 2", usage: 1580 },
  { date: "Week 3", usage: 1890 },
  { date: "Week 4", usage: 2100 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 shadow-md text-sm">
      <p className="text-muted-foreground text-xs mb-0.5">{label}</p>
      <p className="font-medium">{payload[0].value.toLocaleString()} credits</p>
    </div>
  );
}

export function UsageOverTimeChart() {
  const [range, setRange] = useState<"7d" | "30d">("7d");
  const data = range === "7d" ? data7d : data30d;

  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Usage Over Time</CardTitle>
          <CardDescription>Credit consumption trend</CardDescription>
        </div>
        <Select value={range} onValueChange={(v) => setRange(v as "7d" | "30d")}>
          <SelectTrigger className="w-28 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pl-0">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ left: 0, right: 16 }}>
            <defs>
              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} className="text-xs" stroke="var(--muted-foreground)" />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="usage" stroke="var(--primary)" strokeWidth={2} fill="url(#colorUsage)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}