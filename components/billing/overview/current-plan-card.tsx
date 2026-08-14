"use client";

import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  CreditCard,
} from "lucide-react";

import { subscription } from "../mock-data";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CurrentPlanCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            Your active subscription
          </CardDescription>
        </div>

        <Badge className="gap-1">
          <CheckCircle2 className="size-3.5" />
          {subscription.status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6">

        <div>
          <h2 className="text-3xl font-bold">
            {subscription.plan}
          </h2>

          <p className="mt-1 text-muted-foreground">
            {subscription.price} / {subscription.billingCycle.toLowerCase()}
          </p>
        </div>

        <div className="space-y-4">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Calendar className="size-5" />
            </div>

            <div>
              <p className="text-sm font-medium">
                Next Billing
              </p>

              <p className="text-sm text-muted-foreground">
                {subscription.renewDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <CreditCard className="size-5" />
            </div>

            <div>
              <p className="text-sm font-medium">
                Payment Method
              </p>

              <p className="text-sm text-muted-foreground">
                Visa •••• 4582
              </p>
            </div>
          </div>

        </div>

        <Button className="w-full">
          Upgrade Plan
          <ArrowUpRight className="size-4" />
        </Button>

      </CardContent>
    </Card>
  );
}