"use client";

import { useState } from "react";
import { MapPin, Pencil } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import BillingAddressDialog from "./billing-address-dialog";

export default function BillingAddress() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Billing Address</CardTitle>

          <CardDescription>
            Address used for invoices.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <MapPin className="size-5" />
            </div>

            <div className="space-y-1 text-sm">
              <p className="font-semibold">Alex Martin</p>
              <p>221B Baker Street</p>
              <p>London</p>
              <p>United Kingdom</p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <Pencil className="size-4" />
            Edit
          </Button>
        </CardContent>
      </Card>

      <BillingAddressDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}