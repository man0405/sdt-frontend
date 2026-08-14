"use client";

import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function BillingHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Billing
        </h1>

        <p className="mt-1 text-muted-foreground">
          Manage your subscription, AI usage and invoices.
        </p>
      </div>

      <Button size="lg">
        Upgrade Plan
        <ArrowUpRight className="size-5" />
      </Button>
    </div>
  );
}