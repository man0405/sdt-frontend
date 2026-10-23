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
          Xác minh email
        </h2>

        <p className="text-sm text-muted-foreground">
          Chúng tôi đã gửi liên kết xác minh đến địa chỉ
        </p>

        {email && (
          <p className="font-medium break-all">
            {email}
          </p>
        )}

        <p className="text-sm text-muted-foreground">
          Mở email và chọn liên kết xác minh để hoàn tất đăng ký tài khoản.
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
            Mở ứng dụng email
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
              Đang gửi...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              {countdown > 0
                ? `Gửi lại sau ${countdown} giây`
                : "Gửi lại email xác minh"}
            </>
          )}
        </Button>

        <Button
          variant="ghost"
          className="w-full"
          onClick={onChangeEmail}
        >
          Thay đổi địa chỉ email
        </Button>
      </div>

      {/* Footer */}
      <p className="text-xs text-muted-foreground">
        Chưa nhận được email? Hãy kiểm tra thư rác hoặc gửi lại email xác minh.
      </p>
    </div>
  );
}
