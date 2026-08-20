import { Award } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { achievements } from "./mock-data";

export function Achievements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Achievements
        </CardTitle>

        <CardDescription>
          Milestones you've reached while using the platform.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;

            return (
              <div
                key={achievement.title}
                className="rounded-lg border p-4 transition-colors hover:bg-muted/40"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-semibold">
                        {achievement.title}
                      </h4>

                      <Badge
                        variant={
                          achievement.status === "Unlocked"
                            ? "default"
                            : achievement.status === "In Progress"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {achievement.status}
                      </Badge>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {achievement.description}
                    </p>

                    <p className="mt-3 text-xs text-muted-foreground">
                      {achievement.status === "Unlocked"
                        ? `Earned • ${achievement.earned}`
                        : achievement.status === "In Progress"
                        ? "Keep going to unlock this achievement."
                        : "Not unlocked yet."}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}