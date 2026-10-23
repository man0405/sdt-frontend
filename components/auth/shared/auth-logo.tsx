import Link from "next/link";

import { BrandMark } from "@/components/shared/brand-mark";
import { cn } from "@/lib/utils";

interface AuthLogoProps {
  title?: string;
  subtitle?: string;
  href?: string;
  className?: string;
}

export function AuthLogo({
  title = "Phản hồi dịch vụ công",
  subtitle = "Cổng tiếp nhận ý kiến người dân",
  href = "/",
  className,
}: AuthLogoProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <Link
        href={href}
        className="group flex items-center gap-3 transition-opacity hover:opacity-90"
      >
        <BrandMark className="transition-transform group-hover:scale-105" />

        <div className="text-left">
          <h1 className="text-xl font-bold tracking-tight">{title}</h1>

          {subtitle && (
            <p className="text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
