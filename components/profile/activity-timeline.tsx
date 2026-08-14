import {
  CheckCircle2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {activities} from "./mock-data"

export function ActivityTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          Activity Timeline
        </CardTitle>

        <CardDescription>
          Recent account activity and important events.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="relative">
          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.title}
                className="relative flex gap-4 pb-8 last:pb-0"
              >
                {/* Timeline Line */}

                {index !== activities.length - 1 && (
                  <div className="absolute left-5 top-10 h-full w-px bg-border" />
                )}

                {/* Icon */}

                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>

                {/* Content */}

                <div className="flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="font-medium">
                      {activity.title}
                    </h4>

                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}