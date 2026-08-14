"use client";

import { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";

import AppSidebar from "@/components/navigation/app-sidebar";
import AppHeader from "./app-header";
import AppFooter from "./app-footer";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
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