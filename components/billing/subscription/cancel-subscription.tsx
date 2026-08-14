"use client";

import {
  AlertTriangle,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function CancelSubscription() {
  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="text-destructive">
          Danger Zone
        </CardTitle>

        <CardDescription>
          Permanently cancel your active subscription.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <AlertTriangle className="size-5 text-destructive" />

          <span>
            Your subscription will remain active until the billing period ends.
          </span>

        </div>

        <Button variant="destructive">
          Cancel Plan
        </Button>

      </CardContent>
    </Card>
  );
}