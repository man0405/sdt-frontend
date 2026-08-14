import { FileText, FileImage, FileSpreadsheet, File } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type FileType = "pdf" | "image" | "sheet" | "other";

interface RecentFile {
  id: string;
  name: string;
  type: FileType;
  size: string;
  time: string;
}

const iconMap: Record<FileType, React.ElementType> = {
  pdf: FileText,
  image: FileImage,
  sheet: FileSpreadsheet,
  other: File,
};

const files: RecentFile[] = [
  { id: "1", name: "Q3-report-analysis.pdf", type: "pdf", size: "2.4 MB", time: "3h ago" },
  { id: "2", name: "dashboard-mockup-v2.png", type: "image", size: "1.1 MB", time: "1h ago" },
  { id: "3", name: "revenue-breakdown.xlsx", type: "sheet", size: "480 KB", time: "1d ago" },
  { id: "4", name: "meeting-notes.docx", type: "other", size: "120 KB", time: "2d ago" },
];

export function RecentFiles() {
  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Files</CardTitle>
          <CardDescription>Files uploaded or generated recently</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-xs">
          View all
        </Button>
      </CardHeader>
      <CardContent className="space-y-1">
        {files.map((file) => {
          const Icon = iconMap[file.type];
          return (
            <div
              key={file.id}
              className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Icon className="size-4 text-muted-foreground" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {file.size} · {file.time}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}