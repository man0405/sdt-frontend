"use client";

import { Zap } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CreditsBadgeProps {
  used: number;
  limit: number;
  plan?: "Free" | "Pro" | "Team";
}

export function CreditsBadge({
  used = 2450,
  limit = 5000,
  plan = "Free",
}: CreditsBadgeProps) {
  const percentage = Math.min((used / limit) * 100, 100);
  const isLow = percentage >= 80;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="
            hidden sm:flex items-center gap-2 rounded-full border
            border-input bg-background px-3 py-1.5 text-xs font-medium
            hover:bg-accent/50 transition-colors
          "
        >
          <Zap
            className={`size-3.5 ${
              isLow ? "text-destructive" : "text-primary"
            }`}
          />
          <span className="text-muted-foreground">
            {used.toLocaleString()}
            <span className="mx-0.5">/</span>
            {limit.toLocaleString()}
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-72 rounded-xl p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">AI Credits</span>
          <span className="text-xs text-muted-foreground">{plan} plan</span>
        </div>

        <Progress value={percentage} className="h-2 mb-2" />

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span>
            {used.toLocaleString()} of {limit.toLocaleString()} used
          </span>
          <span>{(limit - used).toLocaleString()} left</span>
        </div>

        {isLow && (
          <p className="text-xs text-destructive mb-3">
            You're running low on credits this cycle.
          </p>
        )}

        {plan !== "Team" && (
          <Button size="sm" className="w-full">
            Upgrade for more credits
          </Button>
        )}

        <p className="mt-2 text-[11px] text-muted-foreground text-center">
          Resets on the 1st of every month
        </p>
      </PopoverContent>
    </Popover>
  );
}