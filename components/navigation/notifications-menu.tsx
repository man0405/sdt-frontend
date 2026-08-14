"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  Sparkles,
  CreditCard,
  AlertTriangle,
  UserPlus,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

type NotificationType = "system" | "billing" | "warning" | "team";
type Filter = "all" | "unread";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const iconMap: Record<NotificationType, React.ElementType> = {
  system: Sparkles,
  billing: CreditCard,
  warning: AlertTriangle,
  team: UserPlus,
};

const colorMap: Record<NotificationType, string> = {
  system: "text-primary bg-primary/10",
  billing: "text-blue-600 bg-blue-500/10",
  warning: "text-destructive bg-destructive/10",
  team: "text-emerald-600 bg-emerald-500/10",
};

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    title: "Credits running low",
    description: "You've used 90% of your monthly AI credits.",
    time: "5m ago",
    read: false,
  },
  {
    id: "2",
    type: "team",
    title: "New team member",
    description: "Sarah joined your Codervent workspace.",
    time: "1h ago",
    read: false,
  },
  {
    id: "3",
    type: "system",
    title: "New model available",
    description: "Claude Sonnet 5 is now available for your workspace.",
    time: "3h ago",
    read: false,
  },
  {
    id: "4",
    type: "billing",
    title: "Payment successful",
    description: "Your Pro plan renewal was processed.",
    time: "1d ago",
    read: true,
  },
];

export function NotificationsMenu() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<Filter>("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const visible = useMemo(
    () =>
      filter === "unread"
        ? notifications.filter((n) => !n.read)
        : notifications,
    [notifications, filter]
  );

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markOneRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const dismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-destructive" />
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 rounded-xl p-0">
        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="text-sm font-medium">Notifications</span>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <CheckCheck className="size-3.5" />
              Mark all read
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
          {visible.length === 0 ? (
            <div className="flex h-80 flex-col items-center justify-center gap-2 px-6 text-center">
              <span className="flex size-10 items-center justify-center rounded-full bg-muted">
                <BellOff className="size-4.5 text-muted-foreground" />
              </span>
              <p className="text-sm font-medium">You&apos;re all caught up</p>
              <p className="text-xs text-muted-foreground">
                {filter === "unread"
                  ? "No unread notifications right now."
                  : "New notifications will show up here."}
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
                      !n.read && "bg-accent/30"
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
                        {!n.read && (
                          <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 pr-10">
                        {n.description}
                      </p>
                      <span className="text-[11px] text-muted-foreground mt-1 block">
                        {n.time}
                      </span>
                    </div>

                    <div className="absolute right-2.5 top-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!n.read && (
                        <button
                          onClick={() => markOneRead(n.id)}
                          className="flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                          aria-label="Mark as read"
                        >
                          <Check className="size-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => dismiss(n.id)}
                        className="flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                        aria-label="Dismiss"
                      >
                        <X className="size-3.5" />
                      </button>
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
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}