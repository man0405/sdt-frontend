"use client";

import { useState } from "react";

import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/shared/auth-card";
import { AuthFooter } from "@/components/auth/shared/auth-footer";
import { AuthHeader } from "@/components/auth/shared/auth-header";
import { AuthLogo } from "@/components/auth/shared/auth-logo";
import {
  ForgotPasswordForm,
  ForgotPasswordValues,
} from "@/components/auth/forgot-password/forgot-password-form";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  async function handleSubmit(values: ForgotPasswordValues) {
    try {
      setLoading(true);

      console.log("Forgot Password", values);

      // TODO:
      // Clerk
      // Supabase Auth
      // Auth.js
      // Firebase Auth

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setEmailSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-8">
        <AuthLogo />

        <AuthCard className="p-8">
          <div className="space-y-6">
            <AuthHeader
              title={
                emailSent
                  ? "Check your email"
                  : "Forgot your password?"
              }
              description={
                emailSent
                  ? "We've sent a password reset link to your email address. Please check your inbox."
                  : "Enter your email address and we'll send you a password reset link."
              }
            />

            {emailSent ? (
              <div className="space-y-4">
                <div className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
                  Didn't receive the email? Check your spam folder or request
                  another password reset link.
                </div>

                <button
                  type="button"
                  onClick={() => setEmailSent(false)}
                  className="w-full text-sm font-medium text-primary hover:underline"
                >
                  Send another reset link
                </button>
              </div>
            ) : (
              <ForgotPasswordForm
                isLoading={loading}
                onSubmit={handleSubmit}
              />
            )}

            <AuthFooter
              text="Remember your password?"
              linkLabel="Sign in"
              href="/sign-in"
            />
          </div>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}