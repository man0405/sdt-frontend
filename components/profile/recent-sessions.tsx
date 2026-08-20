import { Globe, MapPin, ShieldCheck, LogOut } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {recentSessions} from "./mock-data"

export function RecentSessions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          Recent Sessions
        </CardTitle>

        <CardDescription>
          Devices that have recently accessed your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {recentSessions.map((session) => {
          const Icon = session.icon;

          return (
            <div
              key={`${session.device}-${session.browser}`}
              className="flex flex-col gap-4 rounded-lg border p-4 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-medium">
                      {session.device}
                    </h4>

                    {session.current && (
                      <Badge>
                        Current Session
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span>{session.browser}</span>
                    <span>•</span>
                    <span>{session.os}</span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {session.location}
                    </div>

                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      {session.ip}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end">
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {session.lastActive}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Last Activity
                  </p>
                </div>

                {!session.current && (
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Revoke
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}