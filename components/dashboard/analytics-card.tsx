import { MessageSquare, Image as ImageIcon, FileText, Mic } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const metrics = [
  { label: "Chat", value: 68, icon: MessageSquare, color: "text-primary" },
  { label: "Image", value: 22, icon: ImageIcon, color: "text-purple-600" },
  { label: "Document", value: 7, icon: FileText, color: "text-blue-600" },
  { label: "Voice", value: 3, icon: Mic, color: "text-orange-600" },
];

export function AnalyticsCard() {
  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>Usage by Feature</CardTitle>
        <CardDescription>Distribution of AI feature usage this month</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <m.icon className={`size-4 ${m.color}`} />
                <span className="text-sm font-medium">{m.label}</span>
              </div>
              <span className="text-sm text-muted-foreground">{m.value}%</span>
            </div>
            <Progress value={m.value} className="h-1.5" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}