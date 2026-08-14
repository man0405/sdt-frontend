import { Zap, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface UsageSummaryCardProps {
  used: number;
  limit: number;
  cycleEnd: string;
  projectedUsage: number;
}

export function UsageSummaryCard({
  used,
  limit,
  cycleEnd,
  projectedUsage,
}: UsageSummaryCardProps) {
  const percentage = Math.min((used / limit) * 100, 100);
  const isOverProjected = projectedUsage > limit;

  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Credits used this cycle
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Zap className="size-4 text-primary" />
        </span>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-semibold">{used.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">
            / {limit.toLocaleString()}
          </span>
        </div>

        <Progress value={percentage} className="h-2" />

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Resets on {cycleEnd}</span>
          <span
            className={`flex items-center gap-1 ${
              isOverProjected ? "text-destructive" : ""
            }`}
          >
            <TrendingUp className="size-3" />
            Projected: {projectedUsage.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}