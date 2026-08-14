import Link from "next/link";
import { Brain } from "lucide-react";

import { cn } from "@/lib/utils";

interface AuthLogoProps {
  title?: string;
  subtitle?: string;
  href?: string;
  className?: string;
}

export function AuthLogo({
  title = "Orbit",
  subtitle = "AI SaaS Starter Kit",
  href = "/",
  className,
}: AuthLogoProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <Link
        href={href}
        className="group flex items-center gap-3 transition-opacity hover:opacity-90"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
          <Brain className="h-6 w-6" />
        </div>

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