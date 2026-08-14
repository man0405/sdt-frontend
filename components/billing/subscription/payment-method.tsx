"use client";

import {
  CreditCard,
  Pencil,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function PaymentMethod() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          Default payment card
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
            <CreditCard className="size-6" />
          </div>

          <div>
            <p className="font-semibold">
              Visa •••• 4582
            </p>

            <p className="text-sm text-muted-foreground">
              Expires 08/2028
            </p>
          </div>

        </div>

        <Button
          variant="outline"
          className="w-full"
        >
          <Pencil className="size-4" />
          Update Card
        </Button>

      </CardContent>
    </Card>
  );
}