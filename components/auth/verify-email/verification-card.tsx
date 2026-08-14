"use client";

import Link from "next/link";
import { MailCheck, Loader2, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface VerificationCardProps {
  email?: string;
  isLoading?: boolean;
  countdown?: number;
  onResend?: () => void | Promise<void>;
  onChangeEmail?: () => void;
}

export function VerificationCard({
  email,
  isLoading = false,
  countdown = 0,
  onResend,
  onChangeEmail,
}: VerificationCardProps) {
  const resendDisabled = countdown > 0 || isLoading;

  return (
    <div className="space-y-8 text-center">
      {/* Icon */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <MailCheck className="h-10 w-10 text-primary" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">
          Verify your email
        </h2>

        <p className="text-sm text-muted-foreground">
          We've sent a verification link to
        </p>

        {email && (
          <p className="font-medium break-all">
            {email}
          </p>
        )}

        <p className="text-sm text-muted-foreground">
          Please check your inbox and click the verification link to activate
          your account.
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button
          className="w-full"
          variant="outline"
          asChild
        >
          <Link href="https://mail.google.com" target="_blank">
            Open Email App
          </Link>
        </Button>

        <Button
          variant="secondary"
          className="w-full"
          disabled={resendDisabled}
          onClick={onResend}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              {countdown > 0
                ? `Resend in ${countdown}s`
                : "Resend Email"}
            </>
          )}
        </Button>

        <Button
          variant="ghost"
          className="w-full"
          onClick={onChangeEmail}
        >
          Change Email Address
        </Button>
      </div>

      {/* Footer */}
      <p className="text-xs text-muted-foreground">
        Didn't receive the email? Check your spam folder or try resending the
        verification email.
      </p>
    </div>
  );
}