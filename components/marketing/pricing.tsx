import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  LifeBuoy,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  "Complete Next.js 16 Project",
  "React 19 + TypeScript",
  "Tailwind CSS v4",
  "shadcn/ui Components",
  "Authentication",
  "AI Chat Module",
  "Knowledge Base",
  "AI Agents",
  "Prompt Library",
  "Workflows",
  "Billing & Subscription",
  "Dashboard",
  "Lifetime Updates",
  "Commercial License",
];

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-24 md:py-32">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.muted.to-colors-muted-foreground/10),transparent)]" />
      <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            Pricing
          </div>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            Everything Included. <br className="hidden sm:inline" />
            One Simple Price.
          </h2>

          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Get instant, lifetime access to the ultimate starter toolkit. No monthly subscriptions, no hidden fees.
          </p>
        </div>

        {/* Master Container Layout */}
        <div className="mx-auto mt-16 max-w-5xl grid gap-8 lg:grid-cols-12 items-stretch">
          
          {/* Main Purchase Card (Takes up 5 cols) */}
          <Card className="relative overflow-hidden border-2 border-primary/50 bg-background/60 shadow-xl rounded-3xl p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between backdrop-blur-sm transition-all duration-300 hover:border-primary">
            {/* Top Badge */}
            <div className="absolute top-0 right-0 rounded-bl-xl bg-primary px-4 py-1 text-xs font-bold text-primary-foreground tracking-wide uppercase">
              Save 40%
            </div>

            <div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Launch Offer</span>
                <h3 className="text-2xl font-bold tracking-tight">AI SaaS Starter Kit</h3>
                <p className="text-sm text-muted-foreground">
                  Everything you need to ship your AI SaaS product this weekend.
                </p>
              </div>

              {/* Price Block */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black tracking-tight text-foreground">$17</span>
                  <span className="text-lg font-medium text-muted-foreground line-through">$27</span>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted px-2 py-0.5 rounded">USD</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">One-time payment. Own it forever.</p>
              </div>
            </div>

            {/* Action & Trust Footer */}
            <div className="mt-8 space-y-6">
              <Button
                size="lg"
                className="w-full group font-semibold shadow-md bg-primary hover:bg-primary/95 transition-all duration-200"
                asChild
              >
                <Link href="https://codervent.lemonsqueezy.com/checkout/buy/567b4e29-c7bb-4440-babf-8e98e5dddc27" className="flex items-center justify-center gap-2" target="_blank">
                  Get Instant Access
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <div className="space-y-3 pt-4 border-t border-border/60 text-xs text-muted-foreground">
                <div className="flex items-center gap-2.5">
                  <RefreshCw className="h-4 w-4 text-primary shrink-0" />
                  <span>Lifetime code updates included</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                  <span>Commercial use license</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <LifeBuoy className="h-4 w-4 text-primary shrink-0" />
                  <span>Premium support forum access</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Features Bento Grid (Takes up 7 cols) */}
          <Card className="bg-muted/40 border border-border/80 rounded-3xl p-8 lg:p-10 lg:col-span-7 flex flex-col justify-center">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">
              What&apos;s inside the box
            </h4>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div 
                  key={feature} 
                  className="group flex items-start gap-3 p-2 rounded-xl transition-colors hover:bg-background/40"
                >
                  <div className="mt-0.5 rounded-md bg-primary/10 p-1 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium text-foreground/90 transition-colors group-hover:text-foreground">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
}