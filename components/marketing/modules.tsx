"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Brain,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const modules = [
  {
    title: "Dashboard",
    description: "Beautiful analytics dashboard with interactive widgets and real-time charts.",
    icon: LayoutDashboard,
    color: "text-sky-600 bg-sky-500/10 dark:bg-sky-500/15 border-sky-500/20",
  },
  {
    title: "AI Chat",
    description: "ChatGPT-style streaming token interface with context preservation.",
    icon: MessageSquare,
    color: "text-indigo-600 bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/20 dark:text-indigo-400",
  },
  {
    title: "AI Agents",
    description: "Configure, spawn, and manage autonomous agent workflows.",
    icon: Bot,
    color: "text-violet-600 bg-violet-500/10 dark:bg-violet-500/15 border-violet-500/20 dark:text-violet-400",
  },
  {
    title: "Knowledge Base",
    description: "Upload corporate files to train private RAG-powered vector stores.",
    icon: Brain,
    color: "text-blue-600 bg-blue-500/10 dark:bg-blue-500/15 border-blue-500/20 dark:text-blue-400",
  },
  {
    title: "Documents",
    description: "Granular control over uploaded file blobs and fine-tuning assets.",
    icon: FileText,
    color: "text-rose-600 bg-rose-500/10 dark:bg-rose-500/15 border-rose-500/20 dark:text-rose-400",
  },
  {
    title: "Workflows",
    description: "Chain repetitive prompt engineering blocks into logical pipelines.",
    icon: Workflow,
    color: "text-teal-600 bg-teal-500/10 dark:bg-teal-500/15 border-teal-500/20 dark:text-teal-400",
  },
  {
    title: "Team Management",
    description: "Multi-tenant workspaces, seat invitations, and usage limits.",
    icon: Users,
    color: "text-emerald-600 bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/20 dark:text-emerald-400",
  },
  {
    title: "Metered Billing",
    description: "Stripe integration handling multi-tier subscriptions and invoices.",
    icon: CreditCard,
    color: "text-amber-600 bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/20 dark:text-amber-400",
  },
  {
    title: "Workspace Settings",
    description: "App-wide environment controls, API keys, and custom profiles.",
    icon: Settings,
    color: "text-slate-600 bg-slate-500/10 dark:bg-slate-500/15 border-slate-500/20 dark:text-slate-400",
  },
];

export function Modules() {
  return (
    <section id="modules" className="relative py-24 bg-background/50">
      
      {/* Mesh Backdrop Blur Blobs - Adaptive for light/dark */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-[130px]" />
        <div className="absolute bottom-[10%] left-[-5%] h-[550px] w-[550px] rounded-full bg-sky-500/5 dark:bg-sky-500/10 blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200/80 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground backdrop-blur-md shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Architected for scale
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Every module you need, <br className="sm:inline hidden" />
            pre-built and production-ready
          </h2>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Stop coding user authentication, stripe hooks, and routing logic from scratch. Focus entirely on engineering your core AI value proposition.
          </p>
        </div>

        {/* Clean, Non-Box Grid Architecture */}
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <div
                key={module.title}
                className="group relative flex flex-col items-start p-6 rounded-3xl transition-all duration-300"
              >
                {/* Modern Adaptive Glass Capsule Layer - Visible only on Hover */}
                <div className="absolute inset-0 -z-10 rounded-3xl opacity-0 scale-95 group-hover:scale-100 group-hover:opacity-100 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl border border-neutral-200/60 dark:border-neutral-800 shadow-[0_20px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out" />

                {/* Rounded Smooth Icon Structure */}
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-2xl border transition-transform duration-300 ease-out group-hover:-translate-y-1 shadow-sm",
                    module.color
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>

                {/* Feature Content */}
                <h3 className="mt-5 text-base font-bold tracking-tight text-foreground">
                  {module.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground flex-1">
                  {module.description}
                </p>

                {/* Text Link Interaction */}
                <Link 
                  href="#" 
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary tracking-wide uppercase transition-colors"
                >
                  Explore Component
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Footer Action Bar */}
        <div className="mt-20 flex justify-center">
          <div className="inline-flex items-center gap-4 p-2 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl shadow-sm">
            <span className="text-xs font-semibold text-muted-foreground pl-4 hidden sm:inline">
              Ready to ship your application this week?
            </span>
            <Button size="sm" className="font-semibold shadow-md px-5 rounded-xl h-9" asChild>
              <Link href="/pricing" className="flex items-center gap-1.5">
                Get the Starter Kit
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}