import { profileOverview } from "./mock-data";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export function ProfileOverview() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {profileOverview.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title}>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  {item.title}
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  {item.value}
                </h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                <Icon className="h-6 w-6 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}