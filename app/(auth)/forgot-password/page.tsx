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

      console.log("Quên mật khẩu", values);

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
                  ? "Kiểm tra email của bạn"
                  : "Khôi phục mật khẩu"
              }
              description={
                emailSent
                  ? "Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu. Vui lòng kiểm tra hộp thư của bạn."
                  : "Nhập địa chỉ email đã đăng ký để nhận hướng dẫn đặt lại mật khẩu."
              }
            />

            {emailSent ? (
              <div className="space-y-4">
                <div className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
                  Chưa nhận được email? Hãy kiểm tra thư rác, rồi thử gửi lại hướng dẫn.
                </div>

                <button
                  type="button"
                  onClick={() => setEmailSent(false)}
                  className="w-full text-sm font-medium text-primary hover:underline"
                >
                  Gửi lại liên kết đặt lại mật khẩu
                </button>
              </div>
            ) : (
              <ForgotPasswordForm
                isLoading={loading}
                onSubmit={handleSubmit}
              />
            )}

            <AuthFooter
              text="Bạn đã nhớ mật khẩu?"
              linkLabel="Đăng nhập"
              href="/sign-in"
            />
          </div>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
