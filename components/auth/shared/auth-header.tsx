import { cn } from "@/lib/utils";

interface AuthHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function AuthHeader({
  title,
  description,
  className,
}: AuthHeaderProps) {
  return (
    <div className={cn("space-y-2 text-center", className)}>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h1>

      {description && (
        <p className="text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}