"use client";

import { Database, FileText } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ProjectKnowledgeTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="mb-6 flex items-center gap-3">
            <Database className="size-6 text-primary" />

            <div>
              <h3 className="font-semibold">Knowledge Base</h3>
              <p className="text-sm text-muted-foreground">
                18 documents embedded
              </p>
            </div>
          </div>

          <Progress value={72} />

          <p className="mt-3 text-sm text-muted-foreground">
            7.2GB / 10GB used
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-6">
          <h3 className="font-semibold">Recent Documents</h3>

          {[
            "Brand Guidelines.pdf",
            "SEO Strategy.docx",
            "Pricing.xlsx",
          ].map((doc) => (
            <div
              key={doc}
              className="flex items-center gap-3"
            >
              <FileText className="size-5 text-primary" />

              <span>{doc}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}