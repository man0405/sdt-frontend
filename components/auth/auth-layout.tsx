import * as React from "react";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const features = [
  {
    icon: Sparkles,
    title: "AI Powered",
    description: "Build modern AI SaaS applications faster.",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    description: "Authentication built with security in mind.",
  },
  {
    icon: Zap,
    title: "Production Ready",
    description: "Scalable architecture using Next.js & shadcn/ui.",
  },
];

export function AuthLayout({
  children,
  className,
}: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen grid lg:grid-cols-2",
        className
      )}
    >
      {/* Left Branding Panel */}
      <div className="relative hidden overflow-hidden bg-muted lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />

        <div className="relative z-10 flex h-full flex-col justify-start gap-12 p-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-primary" />
              AI SaaS Starter Kit
            </div>

            <h1 className="mt-8 max-w-md text-5xl font-bold tracking-tight">
              Build AI products faster.
            </h1>

            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              A production-ready starter kit built with Next.js, React,
              Tailwind CSS and shadcn/ui to help you launch modern AI
              applications quickly.
            </p>
          </div>

          <div className="space-y-5">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 rounded-xl border bg-background/70 p-4 backdrop-blur"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {feature.title}
                    </h3> 
                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}