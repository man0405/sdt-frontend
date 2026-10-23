"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";

import AppSidebar from "@/components/navigation/app-sidebar";
import { getAccessToken } from "@/lib/feedback-api";
import AppFooter from "./app-footer";
import AppHeader from "./app-header";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (getAccessToken()) {
      queueMicrotask(() => setAuthenticated(true));
      return;
    }
    router.replace("/sign-in");
  }, [router]);

  if (!authenticated) return null;

  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>

        <AppFooter />
      </div>
    </SidebarProvider>
  );
}
