import {
  KeyRound,
  Lock,
  ShieldCheck,
  Smartphone,
  ChevronRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {securityItems} from "./mock-data"

export function SecuritySummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          Security Summary
        </CardTitle>

        <CardDescription>
          Review your account security settings and authentication methods.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {securityItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>

                <div>
                  <h4 className="font-medium">
                    {item.title}
                  </h4>

                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge>
                  {item.status}
                </Badge>

                <Button variant="ghost" size="sm">
                  {item.action}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}