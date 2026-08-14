"use client";

import { Bot, Play, Pause } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const agents = [
  {
    id: 1,
    name: "Copy Writer",
    description: "Generates marketing copy",
    status: "Running",
  },
  {
    id: 2,
    name: "SEO Assistant",
    description: "Optimizes blog content",
    status: "Idle",
  },
];

export function ProjectAgentsTab() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {agents.map((agent) => (
        <Card key={agent.id}>
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Bot className="size-6" />
              </div>

              <div>
                <h3 className="font-semibold">{agent.name}</h3>

                <p className="text-sm text-muted-foreground">
                  {agent.description}
                </p>

                <Badge
                  variant={
                    agent.status === "Running"
                      ? "default"
                      : "secondary"
                  }
                  className="mt-2"
                >
                  {agent.status}
                </Badge>
              </div>
            </div>

            <Button variant="outline" size="icon">
              {agent.status === "Running" ? (
                <Pause className="size-4" />
              ) : (
                <Play className="size-4" />
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}