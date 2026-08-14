import { MessageSquare, Image as ImageIcon, FileText, Mic } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type ActivityType = "chat" | "image" | "document" | "voice";

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  time: string;
}

const iconMap: Record<ActivityType, React.ElementType> = {
  chat: MessageSquare,
  image: ImageIcon,
  document: FileText,
  voice: Mic,
};

const colorMap: Record<ActivityType, string> = {
  chat: "text-primary bg-primary/10",
  image: "text-purple-600 bg-purple-500/10",
  document: "text-blue-600 bg-blue-500/10",
  voice: "text-orange-600 bg-orange-500/10",
};

const activities: Activity[] = [
  { id: "1", type: "chat", title: "Explain quantum computing basics", time: "5m ago" },
  { id: "2", type: "image", title: "Product mockup - dashboard v2", time: "1h ago" },
  { id: "3", type: "document", title: "Q3 report analysis.pdf", time: "3h ago" },
  { id: "4", type: "chat", title: "Debug React useEffect issue", time: "5h ago" },
  { id: "5", type: "voice", title: "Meeting transcript summary", time: "1d ago" },
];

export function ActivityFeed() {
  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest AI interactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type];
          return (
            <div
              key={activity.id}
              className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colorMap[activity.type]}`}>
                <Icon className="size-4" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}