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

      console.log("Đặt lại mật khẩu", values);

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
      title="Đã cập nhật mật khẩu"
      description="Mật khẩu đã được đặt lại thành công. Bạn có thể đăng nhập bằng mật khẩu mới."
      primaryLabel="Tiếp tục đăng nhập"
      primaryHref="/sign-in"
    />
  ) : (
    <div className="space-y-6">
      <AuthHeader
        title="Đặt lại mật khẩu"
        description="Chọn mật khẩu mới để bảo vệ tài khoản của bạn."
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
