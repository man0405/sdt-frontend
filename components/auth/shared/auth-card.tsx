import * as React from "react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AuthCard({
  children,
  className,
  ...props
}: AuthCardProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-md border-border/60 bg-background/95 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-background/80",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}