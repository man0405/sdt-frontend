import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto px-6 max-w-7xl">
        <div className="overflow-hidden shadow rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-primary/5 px-8 py-16 text-center">

          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-primary" />
            Ready to Launch?
          </div>

          <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Build Your Next
            <br />
            AI SaaS Faster
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Skip months of development and launch your AI SaaS with a
            production-ready Next.js starter kit built using the latest modern
            technologies.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="https://codervent.lemonsqueezy.com/checkout/buy/567b4e29-c7bb-4440-babf-8e98e5dddc27" target="_blank">
                Buy Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">
                Live Demo
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}