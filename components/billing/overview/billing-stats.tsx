"use client";

import {
  CreditCard,
  Database,
  Coins,
  Cpu,
} from "lucide-react";

import { billingStats } from "../mock-data";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

const stats = [
  {
    title: "Monthly Spend",
    value: billingStats.monthlySpend,
    icon: CreditCard,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    title: "API Calls",
    value: billingStats.apiCalls.toLocaleString(),
    icon: Cpu,
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    title: "Tokens",
    value: billingStats.totalTokens,
    icon: Coins,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Vector Storage",
    value: billingStats.vectorStorage,
    icon: Database,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
];

export default function BillingStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {item.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  {item.value}
                </h2>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color}`}
              >
                <Icon className="size-5" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}