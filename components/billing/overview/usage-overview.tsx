"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { monthlyUsage } from "../mock-data";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UsageOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Usage</CardTitle>

        <CardDescription>
          AI usage cost over the last 7 months
        </CardDescription>
      </CardHeader>

      <CardContent>

        <div className="h-[300px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart data={monthlyUsage}>

              <defs>
                <linearGradient
                  id="usageGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--primary)"
                    stopOpacity={0.4}
                  />

                  <stop
                    offset="100%"
                    stopColor="var(--primary)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="cost"
                stroke="var(--primary)"
                strokeWidth={3}
                fill="url(#usageGradient)"
              />

            </AreaChart>
          </ResponsiveContainer>

        </div>

      </CardContent>
    </Card>
  );
}