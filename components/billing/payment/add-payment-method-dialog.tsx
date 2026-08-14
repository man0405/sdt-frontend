"use client";

import { useState } from "react";
import { Plus, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddPaymentMethodDialogProps {
  onAdd?: (data: {
    cardNumber: string;
    expiry: string;
    cvc: string;
    holderName: string;
  }) => void;
}

export function AddPaymentMethodDialog({ onAdd }: AddPaymentMethodDialogProps) {
  const [open, setOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [holderName, setHolderName] = useState("");

  const handleSubmit = () => {
    if (!cardNumber.trim() || !expiry.trim() || !cvc.trim() || !holderName.trim()) return;
    onAdd?.({ cardNumber, expiry, cvc, holderName });
    setCardNumber("");
    setExpiry("");
    setCvc("");
    setHolderName("");
    setOpen(false);
  };

  const isValid =
    cardNumber.trim() && expiry.trim() && cvc.trim() && holderName.trim();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-1.5">
          <Plus className="size-4" />
          Add payment method
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add a payment method</DialogTitle>
          <DialogDescription>
            Your card details are securely encrypted.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="holder-name">Cardholder name</Label>
            <Input
              id="holder-name"
              placeholder="Virendra Kumar"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-number">Card number</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                className="pl-9"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={19}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 space-y-2">
              <Label htmlFor="expiry">Expiry</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                maxLength={5}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                maxLength={4}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            Add card
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}