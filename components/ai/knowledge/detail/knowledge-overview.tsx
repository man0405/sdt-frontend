"use client";

import {
  Database,
  FileText,
  HardDrive,
  Clock3,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface KnowledgeOverviewProps {
  documentCount: number;
  storage: string;
  sourceCount: number;
  lastSynced: string;
}

export function KnowledgeOverview({
  documentCount,
  storage,
  sourceCount,
  lastSynced,
}: KnowledgeOverviewProps) {
  const stats = [
    {
      title: "Documents",
      value: documentCount.toLocaleString(),
      icon: FileText,
    },
    {
      title: "Storage",
      value: storage,
      icon: HardDrive,
    },
    {
      title: "Sources",
      value: sourceCount,
      icon: Database,
    },
    {
      title: "Last Sync",
      value: lastSynced,
      icon: Clock3,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-2xl font-semibold tracking-tight">
                {stat.value}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}