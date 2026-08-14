import { MessageSquare, Image as ImageIcon, FileText, Mic } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const features = [
  { label: "Chat", used: 1680, icon: MessageSquare, color: "text-primary" },
  { label: "Image Generation", used: 540, icon: ImageIcon, color: "text-purple-600" },
  { label: "Document Q&A", used: 180, icon: FileText, color: "text-blue-600" },
  { label: "Voice Assistant", used: 50, icon: Mic, color: "text-orange-600" },
];

export function UsageByFeatureChart() {
  const total = features.reduce((sum, f) => sum + f.used, 0);

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>Usage by Feature</CardTitle>
        <CardDescription>Where your credits are going this cycle</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {features.map((f) => {
          const percentage = (f.used / total) * 100;
          return (
            <div key={f.label}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <f.icon className={`size-4 ${f.color}`} />
                  <span className="text-sm font-medium">{f.label}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {f.used.toLocaleString()} ({percentage.toFixed(0)}%)
                </span>
              </div>
              <Progress value={percentage} className="h-1.5" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}