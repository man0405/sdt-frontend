import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UsageLimitBannerProps {
  percentage: number;
  onUpgrade?: () => void;
}

export function UsageLimitBanner({ percentage, onUpgrade }: UsageLimitBannerProps) {
  if (percentage < 80) return null;

  const isCritical = percentage >= 95;

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-xl border p-4 ${
        isCritical
          ? "border-destructive/30 bg-destructive/5"
          : "border-amber-500/30 bg-amber-500/5"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            isCritical ? "bg-destructive/10 text-destructive" : "bg-amber-500/10 text-amber-600"
          }`}
        >
          <AlertTriangle className="size-4" />
        </span>
        <div>
          <p className="text-sm font-medium">
            {isCritical ? "You've nearly used all your credits" : "Running low on credits"}
          </p>
          <p className="text-xs text-muted-foreground">
            {percentage}% of your monthly limit used. Upgrade to avoid interruptions.
          </p>
        </div>
      </div>

      <Button size="sm" onClick={onUpgrade} className="shrink-0">
        Upgrade plan
      </Button>
    </div>
  );
}