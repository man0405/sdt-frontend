import * as React from "react";
import { ClipboardCheck, MessageSquareText, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const features = [
  {
    icon: MessageSquareText,
    title: "Tiếp nhận tập trung",
    description: "Ghi nhận ý kiến của người dân về dịch vụ công tại một nơi.",
  },
  {
    icon: ShieldCheck,
    title: "Bảo vệ tài khoản",
    description: "Đăng nhập an toàn để quản lý thông tin phản hồi.",
  },
  {
    icon: ClipboardCheck,
    title: "Theo dõi xử lý",
    description: "Hỗ trợ tổng hợp và theo dõi phản hồi cần được giải quyết.",
  },
];

export function AuthLayout({
  children,
  className,
}: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen grid lg:grid-cols-2",
        className
      )}
    >
      {/* Left Branding Panel */}
      <div className="relative hidden overflow-hidden bg-muted lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />

        <div className="relative z-10 flex h-full flex-col justify-start gap-12 p-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-sm backdrop-blur">
              <MessageSquareText className="h-4 w-4 text-primary" />
              Hệ thống phản hồi dịch vụ công
            </div>

            <h1 className="mt-8 max-w-md text-5xl font-bold tracking-tight">
              Lắng nghe phản hồi, nâng cao chất lượng phục vụ.
            </h1>

            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Nền tảng hỗ trợ tiếp nhận, tổng hợp và theo dõi phản hồi của người dân về các dịch vụ công.
            </p>
          </div>

          <div className="space-y-5">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 rounded-xl border bg-background/70 p-4 backdrop-blur"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {feature.title}
                    </h3> 
                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
