"use client";

import { useCallback, useEffect, useMemo, useState, type ElementType } from "react";
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  Sparkles,
  AlertTriangle,
  MessageSquareText,
  CircleCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  type Notification,
  type NotificationType,
} from "@/lib/feedback-api";

type Filter = "all" | "unread";

const iconMap: Record<NotificationType, ElementType> = {
  NEW_FEEDBACK: MessageSquareText,
  FEEDBACK_STATUS_CHANGED: CircleCheck,
  ANALYSIS_COMPLETED: Sparkles,
  HIGH_PRIORITY: AlertTriangle,
  URGENT_PRIORITY: AlertTriangle,
};

const colorMap: Record<NotificationType, string> = {
  NEW_FEEDBACK: "text-primary bg-primary/10",
  FEEDBACK_STATUS_CHANGED: "text-blue-600 bg-blue-500/10",
  ANALYSIS_COMPLETED: "text-emerald-600 bg-emerald-500/10",
  HIGH_PRIORITY: "text-amber-600 bg-amber-500/10",
  URGENT_PRIORITY: "text-destructive bg-destructive/10",
};

function relativeTime(date: string) {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 1000));
  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ["year", 31_536_000],
    ["month", 2_592_000],
    ["day", 86_400],
    ["hour", 3_600],
    ["minute", 60],
  ];
  const [unit, value] = units.find(([, duration]) => seconds >= duration) ?? ["second", 1];
  return new Intl.RelativeTimeFormat(undefined, { numeric: "auto" }).format(
    -Math.round(seconds / value),
    unit,
  );
}

export function NotificationsMenu() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNotifications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [page, count] = await Promise.all([
        getNotifications({ page: 0, size: 20 }),
        getUnreadNotificationCount(),
      ]);
      setNotifications(page.content);
      setUnreadCount(count.unreadCount);
    } catch {
      setError("Không thể tải thông báo.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialLoad = window.setTimeout(() => void loadNotifications(), 0);
    return () => window.clearTimeout(initialLoad);
  }, [loadNotifications]);

  const visible = useMemo(
    () =>
      filter === "unread"
        ? notifications.filter((n) => !n.isRead)
        : notifications,
    [notifications, filter]
  );

  const markAllRead = async () => {
    setIsUpdating(true);
    try {
      await markAllNotificationsAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch {
      void loadNotifications();
    } finally {
      setIsUpdating(false);
    }
  };

  const markOneRead = async (id: string) => {
    setIsUpdating(true);
    try {
      const updated = await markNotificationAsRead(id);
      setNotifications((prev) => prev.map((n) => (n.id === id ? updated : n)));
      setUnreadCount((count) => Math.max(0, count - 1));
    } catch {
      void loadNotifications();
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <DropdownMenu onOpenChange={(open) => open && void loadNotifications()}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          aria-label={`Thông báo${unreadCount > 0 ? ` (${unreadCount} chưa đọc)` : ""}`}
        >
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold leading-none text-destructive-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 rounded-xl p-0">
        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="text-sm font-medium">Thông báo</span>
          {unreadCount > 0 && (
            <button
              onClick={() => void markAllRead()}
              disabled={isUpdating}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <CheckCheck className="size-3.5" />
              Đánh dấu tất cả đã đọc
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 px-3 pb-2">
          {(["all", "unread"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-medium capitalize transition-colors",
                filter === f
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {f}
              {f === "unread" && unreadCount > 0 && ` (${unreadCount})`}
            </button>
          ))}
        </div>

        <ScrollArea className="h-80">
          {isLoading ? (
            <div className="flex h-80 items-center justify-center px-6 text-sm text-muted-foreground">
              Đang tải thông báo…
            </div>
          ) : error ? (
            <div className="flex h-80 flex-col items-center justify-center gap-2 px-6 text-center">
              <p className="text-sm font-medium">Không thể tải thông báo</p>
              <button onClick={() => void loadNotifications()} className="text-xs text-primary hover:underline">
                Thử lại
              </button>
            </div>
          ) : visible.length === 0 ? (
            <div className="flex h-80 flex-col items-center justify-center gap-2 px-6 text-center">
              <span className="flex size-10 items-center justify-center rounded-full bg-muted">
                <BellOff className="size-4.5 text-muted-foreground" />
              </span>
              <p className="text-sm font-medium">Bạn đã xem hết thông báo</p>
              <p className="text-xs text-muted-foreground">
                {filter === "unread"
                  ? "Hiện không có thông báo chưa đọc."
                  : "Thông báo mới sẽ xuất hiện tại đây."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {visible.map((n) => {
                const Icon = iconMap[n.type];
                return (
                  <div
                    key={n.id}
                    className={cn(
                      "group relative flex gap-3 px-3 py-3 border-b last:border-b-0 transition-colors",
                      !n.isRead && "bg-accent/30"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                        colorMap[n.type]
                      )}
                    >
                      <Icon className="size-4" />
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 pr-10">
                        <span className="text-sm font-medium truncate">
                          {n.title}
                        </span>
                        {!n.isRead && (
                          <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 pr-10">
                        {n.message}
                      </p>
                      <span className="text-[11px] text-muted-foreground mt-1 block">
                        {relativeTime(n.createdAt)}
                      </span>
                    </div>

                    <div className="absolute right-2.5 top-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!n.isRead && (
                        <button
                          onClick={() => void markOneRead(n.id)}
                          disabled={isUpdating}
                          className="flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                          aria-label="Đánh dấu đã đọc"
                        >
                          <Check className="size-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>

        <div className="border-t px-3 py-2">
          <Button variant={"ghost"} 
            className="text-xs transition-colors w-full text-center">
            Xem tất cả thông báo
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
