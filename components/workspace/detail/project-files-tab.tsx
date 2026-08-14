import { FileText, FileImage, FileSpreadsheet, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

type FileType = "pdf" | "image" | "sheet";

interface ProjectFile {
  id: string;
  name: string;
  type: FileType;
  size: string;
  uploadedBy: string;
  time: string;
}

const iconMap: Record<FileType, React.ElementType> = {
  pdf: FileText,
  image: FileImage,
  sheet: FileSpreadsheet,
};

const files: ProjectFile[] = [
  { id: "1", name: "brand-guidelines.pdf", type: "pdf", size: "3.2 MB", uploadedBy: "Alex Martin", time: "5h ago" },
  { id: "2", name: "campaign-mockup.png", type: "image", size: "1.8 MB", uploadedBy: "Sarah Chen", time: "1d ago" },
  { id: "3", name: "budget-breakdown.xlsx", type: "sheet", size: "420 KB", uploadedBy: "Alex Martin", time: "2d ago" },
];

export function ProjectFilesTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" className="gap-1.5">
          <Upload className="size-4" />
          Upload file
        </Button>
      </div>

      <div className="flex flex-col divide-y rounded-xl border">
        {files.map((file) => {
          const Icon = iconMap[file.type];
          return (
            <div
              key={file.id}
              className="flex items-center gap-3 p-4 hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Icon className="size-4 text-muted-foreground" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {file.size} · Uploaded by {file.uploadedBy}
                </p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{file.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}