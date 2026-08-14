import { BookOpen } from "lucide-react";
import Link from "next/link";

export function ApiUsageNote() {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <BookOpen className="size-4 text-primary" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">Read the API documentation</p>
        <p className="text-xs text-muted-foreground">
          Learn how to authenticate and make your first request.
        </p>
      </div>
      <Link
        href="/docs/api"
        className="text-xs font-medium text-primary hover:underline shrink-0"
      >
        View docs
      </Link>
    </div>
  );
}