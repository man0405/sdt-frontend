import Link from "next/link";
import {
  CircleAlert,
  Globe2,
  Mail,
  MessageCircle,
  SquarePen,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  formatRelativeTime,
  type FeedbackListItem,
  sentimentLabels,
  sourceLabels,
  type SourceType,
} from "@/lib/feedback-api";

const sourceMeta: Record<SourceType, { icon: typeof MessageCircle; soft: string }> = {
  ZALO: {
    icon: MessageCircle,
    soft: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  },
  WEBSITE: {
    icon: Globe2,
    soft: "bg-teal-50 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300",
  },
  EMAIL: {
    icon: Mail,
    soft: "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  },
  MANUAL: {
    icon: SquarePen,
    soft: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  },
  OTHER: {
    icon: CircleAlert,
    soft: "bg-slate-100 text-slate-700 dark:bg-muted dark:text-slate-300",
  },
};

interface RecentFeedbackProps {
  feedback: FeedbackListItem[];
}

export function RecentFeedback({ feedback }: RecentFeedbackProps) {
  return (
    <article className="rounded-[24px] border border-border/80 bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">Phản hồi mới nhất</h2>
          <p className="mt-1 text-sm text-muted-foreground">Dữ liệu tiếp nhận gần đây</p>
        </div>
        <Link
          href="/feedback"
          className="text-sm font-medium text-teal-700 hover:text-teal-800 dark:text-teal-300 dark:hover:text-teal-200"
        >
          Xem tất cả
        </Link>
      </div>
      <div className="space-y-1">
        {feedback.length ? (
          feedback.map((item) => <FeedbackRow key={item.id} feedback={item} />)
        ) : (
          <p className="py-10 text-center text-sm text-muted-foreground">Chưa có phản hồi.</p>
        )}
      </div>
    </article>
  );
}

function FeedbackRow({ feedback }: { feedback: FeedbackListItem }) {
  const source = sourceMeta[feedback.source];
  const Icon = source.icon;
  const sentimentClass =
    feedback.sentiment === "NEGATIVE"
      ? "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300"
      : feedback.sentiment === "POSITIVE"
        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
        : "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";

  return (
    <div className="rounded-xl p-3 transition-colors hover:bg-slate-50 dark:hover:bg-muted/60">
      <div className="mb-1.5 flex items-center gap-2 text-xs">
        <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-1 font-medium", source.soft)}>
          <Icon className="size-3" />
          {sourceLabels[feedback.source]}
        </span>
        <span className="text-muted-foreground">{formatRelativeTime(feedback.receivedAt)}</span>
        <span className="ml-auto max-w-32 truncate rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-600 dark:bg-muted dark:text-slate-300">
          {feedback.category ?? "Chưa phân loại"}
        </span>
      </div>
      <p className="line-clamp-2 text-sm leading-5 text-slate-700 dark:text-slate-200">
        {feedback.content}
      </p>
      {feedback.sentiment ? (
        <span className={cn("mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-medium", sentimentClass)}>
          {sentimentLabels[feedback.sentiment]}
        </span>
      ) : (
        <span className="mt-2 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-muted dark:text-slate-300">
          Chưa phân tích
        </span>
      )}
    </div>
  );
}
