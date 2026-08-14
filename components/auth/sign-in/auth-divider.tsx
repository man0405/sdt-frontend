import { cn } from "@/lib/utils";

interface AuthDividerProps {
  label?: string;
  className?: string;
}

export function AuthDivider({
  label = "or continue with",
  className,
}: AuthDividerProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center py-2",
        className
      )}
    >
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>

      <span className="relative bg-background px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}