import Link from "next/link";
import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectChat {
  id: string;
  title: string;
  lastMessage: string;
  time: string;
}

const chats: ProjectChat[] = [
  { id: "1", title: "Q3 ad copy variations", lastMessage: "Here are 5 variations for the summer sale...", time: "2h ago" },
  { id: "2", title: "Campaign timeline planning", lastMessage: "Let's break this into 3 phases...", time: "1d ago" },
  { id: "3", title: "Competitor analysis summary", lastMessage: "Based on the research, here's what stands out...", time: "3d ago" },
];

export function ProjectChatsTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" className="gap-1.5" asChild>
          <Link href="/ai/chat/new">
            <Plus className="size-4" />
            New chat
          </Link>
        </Button>
      </div>

      <div className="flex flex-col divide-y rounded-xl border">
        {chats.map((chat) => (
          <Link
            key={chat.id}
            href={`/ai/chat/${chat.id}`}
            className="flex items-center gap-3 p-4 hover:bg-accent/50 transition-colors"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <MessageSquare className="size-4 text-primary" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{chat.title}</p>
              <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">{chat.time}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}