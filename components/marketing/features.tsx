"use client";

import {
  Bot,
  Brain,
  CreditCard,
  FileText,
  LayoutDashboard,
  Lock,
  MessageSquare,
  Workflow,
  ArrowUpRight,
} from "lucide-react";

import { cn } from "@/lib/utils";

const features = [
  {
    title: "AI Chat",
    description:
      "ChatGPT-style interface with streaming responses, attachments and multiple AI models.",
    icon: MessageSquare,
    color: "text-indigo-600 bg-indigo-500/10",
    glow: "from-indigo-500/20",
    featured: false,
  },
  {
    title: "AI Agents",
    description:
      "Create intelligent AI agents powered by your own knowledge and tools.",
    icon: Bot,
    color: "text-violet-600 bg-violet-500/10",
    glow: "from-violet-500/20",
  },
  {
    title: "Knowledge Base",
    description:
      "Upload documents and connect data sources for Retrieval-Augmented Generation.",
    icon: Brain,
    color: "text-blue-600 bg-blue-500/10",
    glow: "from-blue-500/20",
  },
  {
    title: "Dashboard",
    description:
      "Beautiful admin dashboard with analytics, charts, widgets and responsive layouts.",
    icon: LayoutDashboard,
    color: "text-sky-600 bg-sky-500/10",
    glow: "from-sky-500/20",
  },
  {
    title: "Authentication",
    description:
      "Production-ready authentication, organizations and user management.",
    icon: Lock,
    color: "text-emerald-600 bg-emerald-500/10",
    glow: "from-emerald-500/20",
  },
  {
    title: "Billing",
    description:
      "Subscription management, plans, invoices and usage tracking.",
    icon: CreditCard,
    color: "text-amber-600 bg-amber-500/10",
    glow: "from-amber-500/20",
  },
  {
    title: "Documents",
    description:
      "Manage AI documents, uploads and file organization in one place.",
    icon: FileText,
    color: "text-rose-600 bg-rose-500/10",
    glow: "from-rose-500/20",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Features
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need to launch an AI SaaS
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            A complete collection of modern features built with Next.js 16,
            React 19, Tailwind CSS v4 and shadcn/ui.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                  feature.featured && "sm:col-span-2"
                )}
              >
                {/* Gradient glow on hover */}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    feature.glow
                  )}
                />

                <div className="relative flex items-start justify-between">
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                      feature.color
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </span>

                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </div>

                <h3 className="relative mt-5 text-base font-semibold tracking-tight">
                  {feature.title}
                </h3>

                <p className="relative mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}