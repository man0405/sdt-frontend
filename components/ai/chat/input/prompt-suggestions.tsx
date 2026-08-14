"use client";

import {
  Bug,
  FileText,
  Lightbulb,
  PenSquare,
} from "lucide-react";

import { Card } from "@/components/ui/card";

interface PromptSuggestionsProps {
  onSelect: (prompt: string) => void;
}

const suggestions = [
  {
    icon: Bug,
    title: "Debug my code",
    description:
      "Help me debug a React useEffect infinite loop issue",
    iconClass:
      "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
  },
  {
    icon: PenSquare,
    title: "Write something",
    description:
      "Write a professional email declining a meeting invite",
    iconClass:
      "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
  },
  {
    icon: Lightbulb,
    title: "Brainstorm ideas",
    description:
      "Give me 5 unique SaaS product ideas for developers",
    iconClass:
      "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
  },
  {
    icon: FileText,
    title: "Summarize text",
    description:
      "Summarize the key points of a long document",
    iconClass:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
  },
];

export function PromptSuggestions({
  onSelect,
}: PromptSuggestionsProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {suggestions.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            onClick={() => onSelect(item.description)}
            className="group cursor-pointer border p-6 transition-all duration-300 hover:border-primary/40 hover:bg-muted/40"
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.iconClass}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-medium transition-colors group-hover:text-primary">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}