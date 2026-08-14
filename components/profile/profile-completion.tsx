import {
  CheckCircle2,
  Circle,
  UserCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { profileCompletionItems } from "./mock-data";

const completedCount = profileCompletionItems.filter(
  (item) => item.completed
).length;

const percentage = Math.round(
  (completedCount / profileCompletionItems.length) * 100
);

export function ProfileCompletion() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCircle className="h-5 w-5" />
          Profile Completion
        </CardTitle>

        <CardDescription>
          Complete your profile to unlock the best experience.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* Percentage */}

        <div className="flex flex-col items-center justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-primary/20">
            <span className="text-2xl font-bold">
              {percentage}%
            </span>
          </div>

          <Badge className="mt-4">
            {completedCount} of {profileCompletionItems.length} completed
          </Badge>
        </div>

        {/* Progress */}

        <div className="space-y-2">
          <Progress value={percentage} />

          <p className="text-center text-xs text-muted-foreground">
            Complete the remaining steps to finish your profile.
          </p>
        </div>

        {/* Checklist */}

        <div className="space-y-3">
          {profileCompletionItems.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {item.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}

                <span className="text-sm">
                  {item.title}
                </span>
              </div>

              <Badge
                variant={
                  item.completed
                    ? "default"
                    : "secondary"
                }
              >
                {item.completed
                  ? "Done"
                  : "Pending"}
              </Badge>
            </div>
          ))}
        </div>

        <Button className="w-full">
          Complete Profile
        </Button>

      </CardContent>
    </Card>
  );
}