import Link from "next/link";
import { Home, SearchX } from "lucide-react";
import { BackButton } from "@/components/shared/back-button";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
        {/* Icon */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20 blur-xl" />

          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border bg-card shadow-lg">
            <SearchX className="h-12 w-12 text-primary" />
          </div>

          <div className="absolute inset-0 animate-spin rounded-full border border-dashed border-primary/20 [animation-duration:12s]" />
        </div>

        {/* Error Code */}
        <span className="mt-8 text-7xl font-black tracking-tight text-primary">
          404
        </span>

        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Không tìm thấy trang
        </h1>

        <p className="mt-4 max-w-md text-muted-foreground">
          Trang bạn tìm không tồn tại, đã được chuyển đi hoặc URL không chính xác.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Quay về trang chủ
            </Link>
          </Button>

          <BackButton />
        </div>

        {/* Footer */}
        <p className="mt-12 text-xs text-muted-foreground">
          Bộ khởi tạo ứng dụng AI SaaS • Lỗi 404
        </p>
      </div>
    </div>
  );
}