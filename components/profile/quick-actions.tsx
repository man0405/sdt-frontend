import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { quickActions } from "./mock-data";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Quick Actions
        </CardTitle>

        <CardDescription>
          Frequently used account management actions.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    action.destructive
                      ? "bg-destructive/10 text-destructive"
                      : "bg-muted"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <h4 className="font-medium transition-colors group-hover:text-primary">
                    {action.title}
                  </h4>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}