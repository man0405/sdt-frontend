"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

const conversations = [
  {
    group: "Today",
    items: [
      "Debug React useEffect",
      "Create SaaS Landing Page",
      "Build Dashboard",
    ],
  },
  {
    group: "Yesterday",
    items: [
      "Summarize PDF",
      "Marketing Ideas",
    ],
  },
];

export function ConversationList() {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-4">
        {conversations.map((section) => (
          <div key={section.group}>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {section.group}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => (
                <button
                  key={item}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}