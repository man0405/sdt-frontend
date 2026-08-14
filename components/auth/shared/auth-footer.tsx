import Link from "next/link";

import { cn } from "@/lib/utils";

interface AuthFooterProps {
  text: string;
  linkLabel: string;
  href: string;
  className?: string;
}

export function AuthFooter({
  text,
  linkLabel,
  href,
  className,
}: AuthFooterProps) {
  return (
    <div className={cn("text-center text-sm text-muted-foreground", className)}>
      <span>{text} </span>

      <Link
        href={href}
        className="font-medium text-primary transition-colors hover:underline underline-offset-4"
      >
        {linkLabel}
      </Link>
    </div>
  );
}