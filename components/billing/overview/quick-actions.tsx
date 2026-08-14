"use client";

import Link from "next/link";

import {
  ArrowRight,
  CreditCard,
  FileText,
  KeyRound,
  Receipt,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const actions = [
  {
    title: "Manage Subscription",
    description: "Upgrade, downgrade or cancel your plan.",
    href: "/billing/subscription",
    icon: CreditCard,
  },
  {
    title: "View Invoices",
    description: "Download previous invoices and receipts.",
    href: "/billing/invoices",
    icon: Receipt,
  },
  {
    title: "Usage Analytics",
    description: "Monitor tokens, requests and AI costs.",
    href: "/billing/usage",
    icon: FileText,
  },
  {
    title: "API Keys",
    description: "Create and manage API credentials.",
    href: "/billing/api-keys",
    icon: KeyRound,
  },
];

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>

        <CardDescription>
          Frequently used billing settings.
        </CardDescription>
      </CardHeader>

      <CardContent>

        <div className="grid gap-4 md:grid-cols-2">

          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-xl border p-5 transition-all hover:border-primary hover:bg-accent"
              >
                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>

                    <div>

                      <h3 className="font-semibold">
                        {action.title}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {action.description}
                      </p>

                    </div>

                  </div>

                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />

                </div>
              </Link>
            );
          })}

        </div>

      </CardContent>
    </Card>
  );
}