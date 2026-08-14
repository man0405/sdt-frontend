import {
  Unplug,
  Link2,
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

import {accounts} from "./mock-data";

export function ConnectedAccounts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          Connected Accounts
        </CardTitle>

        <CardDescription>
          Connect third-party services to sign in and synchronize your
          workspace.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {accounts.map((account) => {
          const Icon = account.icon;

          return (
            <div
              key={account.name}
              className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <h4 className="font-medium">{account.name}</h4>

                  <p className="text-sm text-muted-foreground">
                    {account.email}
                  </p>

                  {account.connected && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {account.connectedAt}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    account.connected ? "default" : "secondary"
                  }
                >
                  {account.connected
                    ? "Connected"
                    : "Not Connected"}
                </Badge>

                <Button
                  variant={
                    account.connected ? "outline" : "default"
                  }
                  size="sm"
                >
                  {account.connected ? (
                    <>
                      <Unplug className="mr-2 h-4 w-4" />
                      Disconnect
                    </>
                  ) : (
                    <>
                      <Link2 className="mr-2 h-4 w-4" />
                      Connect
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}