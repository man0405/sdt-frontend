"use client";

import {
  Shield,
  Users,
  Lock,
  Plus,
} from "lucide-react";

import { roleStats } from "./mock-data";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const stats = [
  {
    title: "Total Roles",
    value: roleStats.totalRoles,
    icon: Shield,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Members",
    value: roleStats.totalMembers,
    icon: Users,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Permissions",
    value: roleStats.totalPermissions,
    icon: Lock,
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    title: "Custom Roles",
    value: roleStats.customRoles,
    icon: Shield,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
];

interface RolesHeaderProps {
  onCreateRole: () => void;
}

export default function RolesHeader({
  onCreateRole,
}: RolesHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Roles
          </h1>

          <p className="mt-1 text-muted-foreground">
            Manage roles and permissions for your workspace.
          </p>
        </div>

        <Button
            size="lg"
            onClick={onCreateRole}
        >
            <Plus className="size-5" />
            Create Role
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.title}
            >
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {stat.value}
                  </h2>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
                >
                  <Icon className="size-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}