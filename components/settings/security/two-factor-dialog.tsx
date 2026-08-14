"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";

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

interface TwoFactorDialogProps {
  onEnable?: () => void;
}

export function TwoFactorDialog({ onEnable }: TwoFactorDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"scan" | "verify">("scan");
  const [code, setCode] = useState("");

  const handleContinue = () => {
    if (step === "scan") {
      setStep("verify");
    } else {
      onEnable?.();
      setStep("scan");
      setCode("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Enable 2FA</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle>Two-factor authentication</DialogTitle>
          <DialogDescription>
            {step === "scan"
              ? "Scan this QR code with your authenticator app."
              : "Enter the 6-digit code from your app."}
          </DialogDescription>
        </DialogHeader>

        {step === "scan" ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="flex h-40 w-40 items-center justify-center rounded-xl border-2 border-dashed bg-muted/30">
              <ShieldCheck className="size-10 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Can't scan? Enter this code manually:{" "}
              <code className="font-mono">JBSWY3DPEHPK3PXP</code>
            </p>
          </div>
        ) : (
          <div className="space-y-2 py-4">
            <Label htmlFor="totp-code">Verification code</Label>
            <Input
              id="totp-code"
              placeholder="123456"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="text-center text-lg tracking-widest"
            />
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            disabled={step === "verify" && code.length !== 6}
          >
            {step === "scan" ? "Continue" : "Verify & enable"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}