import Link from "next/link";
import { MessageSquare, Image as ImageIcon, FileText, Mic } from "lucide-react";

const actions = [
  {
    title: "New Chat",
    description: "Start a conversation",
    icon: MessageSquare,
    href: "/ai/chat/new",
    color: "text-primary bg-primary/10",
  },
  {
    title: "Generate Image",
    description: "Create AI artwork",
    icon: ImageIcon,
    href: "/ai/image/new",
    color: "text-purple-600 bg-purple-500/10",
  },
  {
    title: "Document Q&A",
    description: "Analyze a document",
    icon: FileText,
    href: "/ai/documents/new",
    color: "text-blue-600 bg-blue-500/10",
  },
  {
    title: "Voice Assistant",
    description: "Talk with AI",
    icon: Mic,
    href: "/ai/voice/new",
    color: "text-orange-600 bg-orange-500/10",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Link
          key={action.title}
          href={action.href}
          className="flex flex-col gap-3 rounded-xl border p-4 hover:bg-accent/50 hover:border-foreground/20 transition-colors"
        >
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.color}`}
          >
            <action.icon className="size-5" />
          </span>
          <div>
            <p className="text-sm font-medium">{action.title}</p>
            <p className="text-xs text-muted-foreground">{action.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}