"use client";

import { Globe, Lock, Settings2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function ProjectSettingsTab() {
  return (
    <div className="space-y-6">

      <Card>
        <CardContent className="space-y-5 p-6">

          <div className="flex items-center gap-2">
            <Settings2 className="size-5" />
            <h3 className="font-semibold">
              Project Settings
            </h3>
          </div>

          <div className="space-y-2">
            <Label>Project Name</Label>

            <Input defaultValue="Marketing Campaign Q3" />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>

            <Input defaultValue="Ad copy generation project" />
          </div>

        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-5 p-6">

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="size-5" />

              <div>
                <p className="font-medium">Public Project</p>

                <p className="text-sm text-muted-foreground">
                  Allow anyone with the link to view.
                </p>
              </div>
            </div>

            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="size-5" />

              <div>
                <p className="font-medium">Private Project</p>

                <p className="text-sm text-muted-foreground">
                  Only workspace members can access.
                </p>
              </div>
            </div>

            <Switch defaultChecked />
          </div>

        </CardContent>
      </Card>

    </div>
  );
}