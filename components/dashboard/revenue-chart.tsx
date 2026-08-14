"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import {
    Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";

const data = [
    { month: "Feb", revenue: 4200 },
    { month: "Mar", revenue: 5100 },
    { month: "Apr", revenue: 4800 },
    { month: "May", revenue: 6200 },
    { month: "Jun", revenue: 7400 },
    { month: "Jul", revenue: 8100 },
];

function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-lg border bg-popover px-3 py-2 shadow-md text-sm">
            <p className="text-muted-foreground text-xs mb-0.5">{label}</p>
            <p className="font-medium">${payload[0].value.toLocaleString()}</p>
        </div>
    );
}

export function RevenueChart() {
    return (
        <Card className="rounded-xl">
            <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Monthly recurring revenue</CardDescription>
            </CardHeader>
            <CardContent className="pl-0">
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={data} margin={{ left: 0, right: 16 }} barCategoryGap="30%">
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" stroke="var(--muted-foreground)" />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.3 }} />
                        <Bar dataKey="revenue" fill="var(--primary)" radius={[6, 6, 0, 0]} barSize={32} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}