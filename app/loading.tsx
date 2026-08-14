import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex w-full max-w-md flex-col items-center px-6">
        {/* Animated Logo */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20 blur-xl" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border bg-card shadow-lg">
            <Sparkles className="h-9 w-9 animate-pulse text-primary" />
          </div>

          {/* Orbit Ring */}
          <div className="absolute inset-0 animate-spin rounded-full border border-dashed border-primary/20 [animation-duration:8s]" />
        </div>

        {/* Title */}
        <h2 className="mt-8 text-2xl font-bold tracking-tight">
          AI SaaS Starter Kit
        </h2>

        <p className="mt-2 text-center text-sm text-muted-foreground">
          Preparing your workspace...
        </p>

        {/* Progress */}
        <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-[loading_1.4s_ease-in-out_infinite] rounded-full bg-primary" />
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Loading modules...
        </p>
      </div>
    </div>
  );
}