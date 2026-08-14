"use client";

import {
  Database,
  FileText,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";

import { documentStats } from "./mock-data";

import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    title: "Total Documents",
    value: documentStats.totalDocuments,
    icon: FileText,
    iconClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Storage Used",
    value: documentStats.storageUsed,
    icon: Database,
    iconClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    title: "Embedded",
    value: documentStats.embedded,
    icon: CheckCircle2,
    iconClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Processing",
    value: documentStats.processing,
    icon: LoaderCircle,
    iconClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
];

export default function DocumentsStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="border-2 shadow-none transition-all hover:-translate-y-1 hover:shadow-md border-dashed hover:border-solid hover:border-primary"
          >
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconClass}`}
              >
                <Icon
                  className={`size-6 ${
                    stat.title === "Processing" ? "animate-spin" : ""
                  }`}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}