import { accountInformation } from "./mock-data";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AccountInformation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>

        <CardDescription>
          View your account details and membership information.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-5 sm:grid-cols-2">
          {accountInformation.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-start gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {item.label}
                  </p>

                  <p className="font-medium">
                    {item.value}
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