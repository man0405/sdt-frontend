import Link from "next/link";

import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { socialLinks } from "./mock-data";

export function SocialLinks() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>Social Links</CardTitle>

          <CardDescription>
            Public social profiles connected to your account.
          </CardDescription>
        </div>

        <Button
          variant="outline"
          size="sm"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;

            return (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <h4 className="font-medium">
                      {social.name}
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      {social.username}
                    </p>
                  </div>
                </div>
            </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}