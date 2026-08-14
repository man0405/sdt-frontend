"use client";

import { Check } from "lucide-react";

interface PricingFeatureProps {
  children: React.ReactNode;
}

export default function PricingFeature({
  children,
}: PricingFeatureProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Check className="size-4" />
      </div>

      <span className="text-sm">{children}</span>
    </div>
  );
}