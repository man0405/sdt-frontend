import { MessageSquare, Bot, FileText, Zap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ProjectOverviewTabProps {
  chatCount: number;
  agentCount: number;
  fileCount: number;
  creditsUsed: number;
}

const recentActivity = [
  { id: "1", label: "New chat: Q3 ad copy variations", time: "2h ago" },
  { id: "2", label: "File uploaded: brand-guidelines.pdf", time: "5h ago" },
  { id: "3", label: "Agent 'Copy Editor' ran 3 times", time: "1d ago" },
  { id: "4", label: "Sarah Chen joined the project", time: "2d ago" },
];

export function ProjectOverviewTab({
  chatCount,
  agentCount,
  fileCount,
  creditsUsed,
}: ProjectOverviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-sm font-medium text-muted-foreground">Chats</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <MessageSquare className="size-4 text-primary" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{chatCount}</div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-sm font-medium text-muted-foreground">Agents</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
              <Bot className="size-4 text-purple-600" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{agentCount}</div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-sm font-medium text-muted-foreground">Files</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
              <FileText className="size-4 text-blue-600" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{fileCount}</div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-sm font-medium text-muted-foreground">Credits used</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10">
              <Zap className="size-4 text-orange-600" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{creditsUsed.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl">
        <CardHeader>
          <span className="text-sm font-semibold">Recent Activity</span>
        </CardHeader>
        <CardContent className="space-y-1">
          {recentActivity.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg px-2 py-2.5 hover:bg-accent/50 transition-colors"
            >
              <span className="text-sm">{item.label}</span>
              <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}