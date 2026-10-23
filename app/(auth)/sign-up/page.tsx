"use client";

import { useState } from "react";

import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/shared/auth-card";
import { AuthFooter } from "@/components/auth/shared/auth-footer";
import { AuthHeader } from "@/components/auth/shared/auth-header";
import { AuthLogo } from "@/components/auth/shared/auth-logo";
import {
  SignUpForm,
  SignUpValues,
} from "@/components/auth/sign-up/sign-up-form";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  async function handleSignUp(values: SignUpValues) {
    try {
      setLoading(true);

      console.log("Đăng ký", values);

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

  return (
    <AuthLayout>
      <div className="space-y-8">
        <AuthLogo />

        <AuthCard className="p-8">
          <div className="space-y-6">
            <AuthHeader
              title="Đăng ký tài khoản"
              description="Tạo tài khoản để tiếp nhận và theo dõi phản hồi về dịch vụ công."
            />

            <SignUpForm
              isLoading={loading}
              onSubmit={handleSignUp}
            />

            <AuthFooter
              text="Bạn đã có tài khoản?"
              linkLabel="Đăng nhập"
              href="/sign-in"
            />
          </div>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
