"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BillingAddress {
  line1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface BillingAddressCardProps {
  address: BillingAddress;
  onSave?: (address: BillingAddress) => void;
}

export function BillingAddressCard({ address, onSave }: BillingAddressCardProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(address);

  const handleSave = () => {
    onSave?.(form);
    setOpen(false);
  };

  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <span className="text-sm font-semibold">Billing Address</span>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <Pencil className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm rounded-2xl">
            <DialogHeader>
              <DialogTitle>Edit billing address</DialogTitle>
            </DialogHeader>

            <div className="space-y-3 py-2">
              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  value={form.line1}
                  onChange={(e) => setForm({ ...form, line1: e.target.value })}
                />
              </div>
              <div className="flex gap-3">
                <div className="flex-1 space-y-2">
                  <Label>City</Label>
                  <Input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label>State</Label>
                  <Input
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1 space-y-2">
                  <Label>ZIP</Label>
                  <Input
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label>Country</Label>
                  <Input
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save address</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          {address.line1}
          <br />
          {address.city}, {address.state} {address.zip}
          <br />
          {address.country}
        </p>
      </CardContent>
    </Card>
  );
}