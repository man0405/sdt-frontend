import {
  Cpu,
  Coins,
  DollarSign,
  Activity,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function ApiUsageCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5" />
          API Usage
        </CardTitle>

        <CardDescription>
          Monitor your AI API usage and monthly consumption.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* Token Usage */}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Token Usage
            </span>

            <Badge variant="secondary">
              1.2M / 2M
            </Badge>
          </div>

          <Progress value={60} />

          <p className="text-xs text-muted-foreground">
            60% of monthly quota used
          </p>
        </div>

        {/* Credits */}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Credits Remaining
            </span>

            <Badge>
              1,240
            </Badge>
          </div>

          <Progress value={42} />

          <p className="text-xs text-muted-foreground">
            Credits reset on August 1
          </p>
        </div>

        {/* Stats */}

        <div className="grid gap-4 sm:grid-cols-3">

          <div className="rounded-lg border p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Activity className="h-5 w-5" />
            </div>

            <p className="text-sm text-muted-foreground">
              API Requests
            </p>

            <h3 className="mt-1 text-2xl font-bold">
              54.8K
            </h3>
          </div>

          <div className="rounded-lg border p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Coins className="h-5 w-5" />
            </div>

            <p className="text-sm text-muted-foreground">
              Credits Used
            </p>

            <h3 className="mt-1 text-2xl font-bold">
              7,760
            </h3>
          </div>

          <div className="rounded-lg border p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <DollarSign className="h-5 w-5" />
            </div>

            <p className="text-sm text-muted-foreground">
              Monthly Cost
            </p>

            <h3 className="mt-1 text-2xl font-bold">
              $18.40
            </h3>
          </div>

        </div>

      </CardContent>
    </Card>
  );
}