"use client";

import { useState } from "react";
import { AuthSuccessCard } from "@/components/auth/shared/auth-success-card";

import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/shared/auth-card";
import { AuthHeader } from "@/components/auth/shared/auth-header";
import { AuthLogo } from "@/components/auth/shared/auth-logo";
import {
  ResetPasswordForm,
  ResetPasswordValues,
} from "@/components/auth/reset-password/reset-password-form";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(values: ResetPasswordValues) {
    try {
      setLoading(true);

      console.log("Reset Password", values);

      // TODO:
      // Clerk
      // Supabase Auth
      // Auth.js
      // Firebase Auth

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-8">
        <AuthLogo />

        <AuthCard className="p-8">
  {success ? (
    <AuthSuccessCard
      title="Password Updated"
      description="Your password has been reset successfully. You can now sign in using your new password."
      primaryLabel="Continue to Sign In"
      primaryHref="/sign-in"
    />
  ) : (
    <div className="space-y-6">
      <AuthHeader
        title="Reset Password"
        description="Create a strong password for your account."
      />

      <ResetPasswordForm
        isLoading={loading}
        onSubmit={handleSubmit}
      />
    </div>
  )}
</AuthCard>
      </div>
    </AuthLayout>
  );
}