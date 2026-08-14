"use client";

import { useState } from "react";

import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/shared/auth-card";
import { AuthFooter } from "@/components/auth/shared/auth-footer";
import { AuthHeader } from "@/components/auth/shared/auth-header";
import { AuthLogo } from "@/components/auth/shared/auth-logo";
import { AuthDivider } from "@/components/auth/sign-in/auth-divider";
import { SocialLogin } from "@/components/auth/sign-in/social-login";
import {
  SignUpForm,
  SignUpValues,
} from "@/components/auth/sign-up/sign-up-form";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  async function handleSignUp(values: SignUpValues) {
    try {
      setLoading(true);

      console.log("Sign Up", values);

      // TODO:
      // Clerk
      // Supabase Auth
      // Auth.js
      // Firebase Auth

      await new Promise((resolve) => setTimeout(resolve, 1500));
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialLogin(provider: "google" | "github") {
    try {
      setSocialLoading(provider);

      console.log(provider);

      // TODO:
      // OAuth Login

      await new Promise((resolve) => setTimeout(resolve, 1200));
    } finally {
      setSocialLoading(null);
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-8">
        <AuthLogo />

        <AuthCard className="p-8">
          <div className="space-y-6">
            <AuthHeader
              title="Create your account"
              description="Start building your AI SaaS in minutes."
            />

            <SocialLogin
              loading={socialLoading}
              onProviderClick={handleSocialLogin}
            />

            <AuthDivider />

            <SignUpForm
              isLoading={loading}
              onSubmit={handleSignUp}
            />

            <AuthFooter
              text="Already have an account?"
              linkLabel="Sign in"
              href="/sign-in"
            />
          </div>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}