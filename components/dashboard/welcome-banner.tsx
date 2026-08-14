import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WelcomeBanner({ name = "Virendra" }: { name?: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6">
      <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, {name} 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here's what's happening with your AI workspace today.
          </p>
        </div>
        <Button className="gap-1.5 shrink-0">
          <Sparkles className="size-4" />
          Explore AI tools
        </Button>
      </div>

      <Sparkles className="absolute -right-4 -top-4 size-32 text-primary/5" />
    </div>
  );
}