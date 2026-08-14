"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BillingAddressDialog({
  open,
  onOpenChange,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-xl">

        <DialogHeader>
          <DialogTitle>
            Update Billing Address
          </DialogTitle>

          <DialogDescription>
            This address will appear on invoices.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-4">

          <div className="grid gap-2">
            <Label>Full Name</Label>
            <Input defaultValue="Alex Martin" />
          </div>

          <div className="grid gap-2">
            <Label>Company</Label>
            <Input defaultValue="Orbit AI" />
          </div>

          <div className="grid gap-2">
            <Label>Street Address</Label>
            <Input defaultValue="221B Baker Street" />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="grid gap-2">
              <Label>City</Label>
              <Input defaultValue="London" />
            </div>

            <div className="grid gap-2">
              <Label>Postal Code</Label>
              <Input defaultValue="NW1" />
            </div>

          </div>

          <div className="grid gap-2">
            <Label>Country</Label>
            <Input defaultValue="United Kingdom" />
          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={() => onOpenChange(false)}
          >
            Save Changes
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}