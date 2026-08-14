import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function Announcement() {
  return (
    <section className="border-b border-border/40 bg-gradient-to-r from-primary/5 via-background to-primary/5">
      <div className="mx-auto flex h-11 max-w-7xl items-center justify-center px-6">

        <Link
          href="/pricing"
          className="group inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 shadow-sm backdrop-blur transition-all hover:shadow-md"
        >

          <Badge className="rounded-full bg-primary text-primary-foreground hover:bg-primary">
            <Sparkles className="mr-1 h-3 w-3" />
            New
          </Badge>

          <span className="hidden text-sm text-muted-foreground md:inline">
            🚀 Launch Offer • Save
            <span className="mx-1 font-semibold text-foreground">
              40%
            </span>
            on AI SaaS Starter Kit
          </span>

          <span className="text-sm text-muted-foreground md:hidden">
            Save 40%
          </span>

          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />

        </Link>

      </div>
    </section>
  );
}