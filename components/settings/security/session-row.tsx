import { Monitor, Smartphone, Tablet } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Session {
  id: string;
  device: string;
  deviceType: "desktop" | "mobile" | "tablet";
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

const deviceIcons = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
};

interface SessionRowProps {
  session: Session;
  onRevoke?: (id: string) => void;
}

export function SessionRow({ session, onRevoke }: SessionRowProps) {
  const Icon = deviceIcons[session.deviceType];

  return (
    <div className="flex items-center gap-3 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium truncate">{session.device}</p>
          {session.isCurrent && (
            <span className="text-[10px] font-medium text-emerald-600 bg-emerald-500/10 rounded-full px-1.5 py-0.5">
              This device
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {session.location} · {session.lastActive}
        </p>
      </div>

      {!session.isCurrent && (
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 text-xs h-8"
          onClick={() => onRevoke?.(session.id)}
        >
          Revoke
        </Button>
      )}
    </div>
  );
}