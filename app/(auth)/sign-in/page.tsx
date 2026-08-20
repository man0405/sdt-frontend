"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/shared/auth-card";
import { AuthFooter } from "@/components/auth/shared/auth-footer";
import { AuthLogo } from "@/components/auth/shared/auth-logo";
import { SignInForm, SignInValues } from "@/components/auth/sign-in/sign-in-form";
import { ApiError, login, saveSession } from "@/lib/feedback-api";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn(values: SignInValues) {
    try {
      setLoading(true);
      setError(null);
      const session = await login(values.username, values.password);
      saveSession(session, values.remember);
      router.replace("/dashboard");
    } catch (requestError) {
      setError(requestError instanceof ApiError ? requestError.message : "Unable to sign in. Please try again.");
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


            <SignInForm
              isLoading={loading}
              onSubmit={handleSignIn}
            />

            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

            <AuthFooter
              text="Don't have an account?"
              linkLabel="Sign up"
              href="/sign-up"
            />
          </div>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
