"use client";

import {
  Calendar,
  CheckCircle2,
  Crown,
} from "lucide-react";

import { subscription } from "../mock-data";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CurrentSubscription() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Plan</CardTitle>
        <CardDescription>
          Your active subscription
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Crown className="size-6" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {subscription.plan}
            </h2>

            <p className="text-muted-foreground">
              {subscription.price} / {subscription.billingCycle.toLowerCase()}
            </p>
          </div>

        </div>

        <Badge className="gap-2 w-fit">
          <CheckCircle2 className="size-4" />
          {subscription.status}
        </Badge>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Calendar className="size-4" />
          Next renewal: {subscription.renewDate}
        </div>

        <Button className="w-full">
          Change Plan
        </Button>

      </CardContent>
    </Card>
  );
}