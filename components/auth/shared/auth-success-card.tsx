"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AuthSuccessCardProps {
  title: string;
  description: string;

  primaryLabel: string;
  primaryHref: string;

  secondaryLabel?: string;
  secondaryHref?: string;

  icon?: React.ReactNode;
  className?: string;
}

export function AuthSuccessCard({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  icon,
  className,
}: AuthSuccessCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center space-y-6",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        {icon ?? (
          <CheckCircle2 className="h-8 w-8 text-primary" />
        )}
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          {title}
        </h2>

        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      <Button
        asChild
        className="w-full"
        size="lg"
      >
        <Link href={primaryHref}>
          {primaryLabel}
        </Link>
      </Button>

      {secondaryHref && secondaryLabel && (
        <Button
          asChild
          variant="ghost"
          className="w-full"
        >
          <Link href={secondaryHref}>
            {secondaryLabel}
          </Link>
        </Button>
      )}
    </div>
  );
}