import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Play,
  Sparkles,
  Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const technologies = [
  "Next.js 16",
  "React 19",
  "Tailwind CSS v4",
  "shadcn/ui",
  "TypeScript",
  "Authentication",
  "AI Chat",
  "Billing",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
    >
      {/* Background */}

<div className="absolute inset-0 -z-30 bg-background" />

<div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_45%)]" />

<div className="absolute left-1/2 top-20 -z-20 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

<div className="absolute -left-32 top-32 -z-20 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />

<div className="absolute -right-24 top-48 -z-20 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

<div className="absolute bottom-0 left-1/2 -z-20 h-96 w-[900px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto max-w-7xl px-6 pt-24 pb-16">

        <div className="mx-auto max-w-4xl text-center">

          <Badge
            variant="secondary"
            className="rounded-full px-5 py-1.5 text-sm"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Production Ready AI SaaS Starter Kit
          </Badge>

          <h1 className="mt-8 text-5xl font-extrabold tracking-tight md:text-6xl xl:text-7xl">

            Build Modern

            <span className="mt-2 block bg-gradient-to-r from-primary via-blue-500 to-violet-500 bg-clip-text text-transparent">
              AI SaaS Applications
            </span>

            Faster Than Ever

          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
            Launch production-ready AI SaaS products using
            <span className="font-medium text-foreground">
              {" "}Next.js 16
            </span>,
            {" "}
            React 19,
            Tailwind CSS v4,
            shadcn/ui,
            authentication,
            AI chat,
            knowledge base,
            billing,
            organizations,
            workflows and much more.
          </p>

          {/* CTA */}

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Button
              size="lg"
              className="h-12 px-8 text-base shadow-lg shadow-primary/20"
              asChild
            >
              <Link href="https://codervent.lemonsqueezy.com/checkout/buy/567b4e29-c7bb-4440-babf-8e98e5dddc27">
                Buy Starter Kit

                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base border-white/20 bg-white/50 backdrop-blur-md dark:bg-white/5"
              asChild
            >
              <Link href="/dashboard">
                <Play className="mr-2 h-4 w-4" />
                Live Demo
              </Link>
            </Button>

          </div>

          {/* Social Proof */}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">

            <div className="flex items-center gap-1">

              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}

            </div>

            <span className="text-sm text-muted-foreground">
              Loved by developers building AI products
            </span>

          </div>

          {/* Tech Stack */}

          <div className="mt-12 flex flex-wrap justify-center gap-3">

            {technologies.map((tech) => (
              <div
                key={tech}
                className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm shadow-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-primary" />

                {tech}
              </div>
            ))}

          </div>

        </div>

                {/* Dashboard Preview */}

        <div className="relative mx-auto mt-24 max-w-7xl">

          {/* Glow */}

          <div className="absolute inset-0 -z-10 rounded-[40px] bg-primary/15 blur-3xl" />

          {/* Browser Window */}

          <div className="overflow-hidden rounded-3xl border bg-background shadow-2xl">

            {/* Browser Header */}

            <div className="flex items-center justify-between border-b bg-muted/40 px-5 py-3">

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
              </div>

              <div className="rounded-full border bg-background px-5 py-1 text-xs text-muted-foreground">
                https://yourdomain.com/dashboard
              </div>

              <div className="w-14" />

            </div>

          <Link href="/dashboard">
            <img
              src="/orbit-ai/images/screen-1.png"
              alt="Dashboard Preview"
              className="w-full"
            />
            </Link>

          </div>

          {/* Floating Cards */}

          <div className="rounded-2xl border border-white/20 bg-white/60 p-5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">

            <div className="text-3xl font-bold text-primary">
              20+
            </div>

            <div className="mt-1 text-sm text-muted-foreground">
              Modules Included
            </div>

          </div>

          <div className="absolute -right-8 top-28 hidden rounded-2xl border bg-background p-5 shadow-xl lg:block">

            <div className="text-3xl font-bold text-primary">
              150+
            </div>

            <div className="mt-1 text-sm text-muted-foreground">
              Components
            </div>

          </div>

          <div className="absolute left-20 -bottom-6 hidden rounded-2xl border bg-background p-5 shadow-xl lg:block">

            <div className="text-3xl font-bold text-primary">
              AI
            </div>

            <div className="mt-1 text-sm text-muted-foreground">
              Ready
            </div>

          </div>

          <div className="absolute right-20 -bottom-6 hidden rounded-2xl border bg-background p-5 shadow-xl lg:block">

            <div className="text-3xl font-bold text-primary">
              100%
            </div>

            <div className="mt-1 text-sm text-muted-foreground">
              Responsive
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}