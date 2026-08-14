"use client";

import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis,
} from "recharts";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";

const data = [
  { date: "Jul 4", requests: 120 },
  { date: "Jul 5", requests: 180 },
  { date: "Jul 6", requests: 150 },
  { date: "Jul 7", requests: 240 },
  { date: "Jul 8", requests: 290 },
  { date: "Jul 9", requests: 210 },
  { date: "Jul 10", requests: 340 },
  { date: "Jul 11", requests: 310 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 shadow-md text-sm">
      <p className="text-muted-foreground text-xs mb-0.5">{label}</p>
      <p className="font-medium">{payload[0].value} requests</p>
    </div>
  );
}

export function UsageChart() {
  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>AI Requests</CardTitle>
        <CardDescription>Requests over the last 8 days</CardDescription>
      </CardHeader>
      <CardContent className="pl-0">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ left: 0, right: 16 }}>
            <defs>
              <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} className="text-xs" stroke="var(--muted-foreground)" />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="requests" stroke="var(--primary)" strokeWidth={2} fill="url(#colorRequests)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}