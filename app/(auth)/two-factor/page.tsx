"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/shared/auth-card";
import { AuthHeader } from "@/components/auth/shared/auth-header";
import { AuthLogo } from "@/components/auth/shared/auth-logo";
import { OTPInput } from "@/components/auth/two-factor/otp-input";

const RESEND_DELAY = 60;

export default function TwoFactorPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_DELAY);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  async function handleVerify() {
    try {
      setLoading(true);

      console.log("Xác minh mã OTP:", otp);

      // TODO:
      // Clerk
      // Supabase
      // Firebase
      // Auth.js

      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Đã xác minh mã OTP");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    try {
      setLoading(true);

      console.log("Gửi lại mã OTP");

      // TODO:
      // Resend verification code

      await new Promise((resolve) => setTimeout(resolve, 1200));

      setCountdown(RESEND_DELAY);
      setOtp("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-8">
        <AuthLogo />

        <AuthCard className="p-8">
          <div className="space-y-8">
            <AuthHeader
              title="Xác thực hai bước"
              description="Nhập mã gồm 6 chữ số từ ứng dụng xác thực để tiếp tục."
            />

            <OTPInput
              value={otp}
              onChange={setOtp}
              onVerify={handleVerify}
              isLoading={loading}
            />

            <div className="space-y-3 text-center">
              <button
                type="button"
                disabled={countdown > 0 || loading}
                onClick={handleResend}
                className="text-sm font-medium text-primary hover:underline disabled:pointer-events-none disabled:opacity-50"
              >
                {countdown > 0
                  ? `Gửi lại mã sau ${countdown} giây`
                  : "Gửi lại mã xác minh"}
              </button>

              <div>
                <Link
                  href="/recovery-code"
                  className="text-sm text-muted-foreground hover:text-primary hover:underline"
                >
                  Sử dụng mã khôi phục
                </Link>
              </div>

              <div>
                <Link
                  href="/sign-in"
                  className="text-sm text-muted-foreground hover:text-primary hover:underline"
                >
                  Quay lại đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
