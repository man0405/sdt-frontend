"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ConversationList } from "./conversation-list";

export function ChatSidebar() {
  return (
    <aside className="flex w-72 flex-col border-r bg-background">
      <div className="border-b p-4">
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-hidden">
        <ConversationList />
      </div>
    </aside>
  );
}