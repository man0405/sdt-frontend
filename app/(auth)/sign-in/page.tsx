"use client";

import { useState } from "react";

import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/shared/auth-card";
import { AuthFooter } from "@/components/auth/shared/auth-footer";
import { AuthLogo } from "@/components/auth/shared/auth-logo";
import { AuthDivider } from "@/components/auth/sign-in/auth-divider";
import { SignInForm, SignInValues } from "@/components/auth/sign-in/sign-in-form";
import { SocialLogin } from "@/components/auth/sign-in/social-login";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  async function handleSignIn(values: SignInValues) {
    try {
      setLoading(true);

      console.log("Sign In", values);

      // TODO:
      // Clerk
      // Supabase
      // Firebase
      // Auth.js

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
      // OAuth login

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


            <SocialLogin
              loading={socialLoading}
              onProviderClick={handleSocialLogin}
            />

            <AuthDivider />

            <SignInForm
              isLoading={loading}
              onSubmit={handleSignIn}
            />

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