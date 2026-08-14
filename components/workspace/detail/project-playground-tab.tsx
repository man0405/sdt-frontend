"use client";

import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ProjectPlaygroundTab() {
  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div>
          <h3 className="text-lg font-semibold">
            AI Playground
          </h3>

          <p className="text-muted-foreground">
            Test prompts before using them in workflows.
          </p>
        </div>

        <Select defaultValue="gpt-5">
          <SelectTrigger className="w-56">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="gpt-5">GPT-5</SelectItem>
            <SelectItem value="claude">Claude</SelectItem>
            <SelectItem value="gemini">Gemini</SelectItem>
          </SelectContent>
        </Select>

        <Textarea
          rows={8}
          placeholder="Write your prompt..."
        />

        <Button>
          <Sparkles className="mr-2 size-4" />
          Run Prompt
        </Button>
      </CardContent>
    </Card>
  );
}